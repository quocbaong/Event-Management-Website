package com.eventhub.web.controller;

import com.eventhub.domain.entity.Notification;
import com.eventhub.domain.entity.User;
import com.eventhub.repository.NotificationRepository;
import com.eventhub.repository.UserRepository;
import com.eventhub.web.dto.response.NotificationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getNotifications(
            @AuthenticationPrincipal UserDetails userDetails) {
        
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Notification> notifications = notificationRepository.findByUserOrderByCreatedAtDesc(user);
        
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd 'Th'M, yyyy")
                .withZone(ZoneId.systemDefault());

        Instant now = Instant.now();

        List<NotificationDTO> dtos = notifications.stream().map(notif -> {
            String uiType = "reminder";
            String actionLabel = null;
            String location = null;

            if (notif.getType() != null) {
                switch (notif.getType()) {
                    case SYSTEM:
                        uiType = "reminder";
                        break;
                    case BROADCAST:
                        uiType = "reminder";
                        break;
                    case EVENT_UPDATE:
                        uiType = "update";
                        break;
                    case TICKET_CONFIRMED:
                        uiType = "approval";
                        actionLabel = "CHI TIẾT VÉ";
                        break;
                    case PAYMENT_SUCCESS:
                        uiType = "approval";
                        break;
                    case WITHDRAWAL_UPDATE:
                        uiType = "update";
                        break;
                    case REMINDER:
                        uiType = "reminder";
                        break;
                }
            }

            // Extract custom data if present
            if (notif.getData() != null) {
                if (notif.getData().containsKey("location")) {
                    location = String.valueOf(notif.getData().get("location"));
                    uiType = "location";
                    actionLabel = "XEM BẢN ĐỒ";
                }
                if (notif.getData().containsKey("actionLabel")) {
                    actionLabel = String.valueOf(notif.getData().get("actionLabel"));
                }
            }

            // Time calculation
            String timeText = "Hôm nay";
            if (notif.getCreatedAt() != null) {
                long diffMins = Duration.between(notif.getCreatedAt(), now).toMinutes();
                if (diffMins < 60) {
                    timeText = Math.max(1, diffMins) + " phút trước";
                } else if (diffMins < 1440) {
                    timeText = (diffMins / 60) + " giờ trước";
                } else {
                    timeText = dateFormatter.format(notif.getCreatedAt());
                }
            }

            String dateText = notif.getCreatedAt() != null ? dateFormatter.format(notif.getCreatedAt()) : "";

            return NotificationDTO.builder()
                    .id(notif.getId())
                    .type(uiType)
                    .title(notif.getTitle())
                    .description(notif.getBody())
                    .time(timeText)
                    .date(dateText)
                    .location(location)
                    .actionLabel(actionLabel)
                    .unread(!notif.getIsRead())
                    .isNew(!notif.getIsRead())
                    .build();
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/{id}/read")
    @Transactional
    public ResponseEntity<Void> markAsRead(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Notification notif = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notif.getUser().getEmail().equals(userDetails.getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        notif.setIsRead(true);
        notif.setReadAt(Instant.now());
        notificationRepository.save(notif);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/read-all")
    @Transactional
    public ResponseEntity<Void> markAllAsRead(
            @AuthenticationPrincipal UserDetails userDetails) {
        
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Notification> unreadNotifs = notificationRepository.findByUserOrderByCreatedAtDesc(user)
                .stream().filter(n -> !n.getIsRead()).collect(Collectors.toList());

        Instant now = Instant.now();
        for (Notification n : unreadNotifs) {
            n.setIsRead(true);
            n.setReadAt(now);
        }
        notificationRepository.saveAll(unreadNotifs);

        return ResponseEntity.ok().build();
    }
}
