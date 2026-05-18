package com.eventhub.service;

import com.eventhub.domain.entity.Notification;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.NotificationType;
import com.eventhub.repository.NotificationRepository;
import com.eventhub.repository.UserRepository;
import com.eventhub.web.dto.response.NotificationResponse;
import com.eventhub.web.mapper.NotificationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    // Concurrent Map for real-time SSE Emitters
    private final Map<UUID, List<SseEmitter>> emitters = new ConcurrentHashMap<>();

    @Transactional(readOnly = true)
    public Page<NotificationResponse> getUserNotifications(UUID userId, Pageable pageable) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable)
                .map(notificationMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public long getUnreadCount(UUID userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    @Transactional
    public NotificationResponse markAsRead(UUID userId, UUID notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found with ID: " + notificationId));

        if (!notification.getUser().getId().equals(userId)) {
            throw new IllegalStateException("You are not authorized to mark this notification as read");
        }

        if (!notification.getIsRead()) {
            notification.setIsRead(true);
            notification.setReadAt(Instant.now());
            notification = notificationRepository.save(notification);
        }

        return notificationMapper.toResponse(notification);
    }

    @Transactional
    public void markAllAsRead(UUID userId) {
        notificationRepository.markAllAsRead(userId, Instant.now());
    }

    @Transactional
    public NotificationResponse createNotification(UUID userId, NotificationType type, String title, String body, Map<String, Object> data) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .title(title)
                .body(body)
                .data(data)
                .isRead(false)
                .build();

        notification = notificationRepository.save(notification);
        NotificationResponse response = notificationMapper.toResponse(notification);

        // Push via SSE in real-time
        pushNotification(userId, response);

        return response;
    }

    // Server-Sent Events Emitter management
    public SseEmitter subscribe(UUID userId) {
        // Create emitter with 30-minute timeout
        SseEmitter emitter = new SseEmitter(1800000L);

        // Send a connect heartbeat event
        try {
            emitter.send(SseEmitter.event().name("connect").data("Connected successfully"));
        } catch (IOException e) {
            log.error("Failed to send initial connection event to user: {}", userId, e);
            return emitter;
        }

        // Save active emitter
        emitters.computeIfAbsent(userId, k -> new CopyOnWriteArrayList<>()).add(emitter);

        // Clean up on completion/timeout/error
        emitter.onCompletion(() -> removeEmitter(userId, emitter));
        emitter.onTimeout(() -> removeEmitter(userId, emitter));
        emitter.onError((e) -> removeEmitter(userId, emitter));

        return emitter;
    }

    private void pushNotification(UUID userId, NotificationResponse notification) {
        List<SseEmitter> activeEmitters = emitters.get(userId);
        if (activeEmitters == null || activeEmitters.isEmpty()) {
            return;
        }

        List<SseEmitter> deadEmitters = new ArrayList<>();

        for (SseEmitter emitter : activeEmitters) {
            try {
                emitter.send(SseEmitter.event()
                        .id(notification.getId().toString())
                        .name("notification")
                        .data(notification));
            } catch (IOException e) {
                log.warn("Failed to push notification to emitter for user: {}, removing emitter.", userId, e);
                deadEmitters.add(emitter);
            }
        }

        if (!deadEmitters.isEmpty()) {
            activeEmitters.removeAll(deadEmitters);
            if (activeEmitters.isEmpty()) {
                emitters.remove(userId);
            }
        }
    }

    private void removeEmitter(UUID userId, SseEmitter emitter) {
        List<SseEmitter> activeEmitters = emitters.get(userId);
        if (activeEmitters != null) {
            activeEmitters.remove(emitter);
            if (activeEmitters.isEmpty()) {
                emitters.remove(userId);
            }
            log.info("Cleaned up SSE emitter for user: {}", userId);
        }
    }
}
