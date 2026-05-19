package com.eventhub.infrastructure.listener;

import com.eventhub.domain.entity.Notification;
import com.eventhub.domain.entity.Registration;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.NotificationType;
import com.eventhub.domain.event.RegistrationConfirmedEvent;
import com.eventhub.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final NotificationRepository notificationRepository;

    @EventListener
    @Transactional
    public void handleRegistrationConfirmed(RegistrationConfirmedEvent event) {
        try {
            Registration registration = event.registration();
            User attendee = event.attendee();
            User organizer = registration.getEvent().getOrganizer();
            String eventTitle = registration.getEvent().getTitle();

            // 1. Create notification for Attendee
            Map<String, Object> attendeeData = new HashMap<>();
            attendeeData.put("eventId", registration.getEvent().getId().toString());
            attendeeData.put("registrationId", registration.getId().toString());

            Notification attendeeNotification = Notification.builder()
                    .user(attendee)
                    .type(NotificationType.TICKET_CONFIRMED)
                    .title("Đăng ký vé thành công")
                    .body("Chúc mừng! Bạn đã đăng ký thành công vé cho sự kiện '" + eventTitle + "'. Vé điện tử và mã QR đã được tạo sẵn trong tài khoản của bạn.")
                    .data(attendeeData)
                    .isRead(false)
                    .build();
            notificationRepository.save(attendeeNotification);
            log.info("Ticket confirmation notification created for attendee: {}", attendee.getEmail());

            // 2. Create notification for Organizer
            if (organizer != null) {
                Map<String, Object> organizerData = new HashMap<>();
                organizerData.put("eventId", registration.getEvent().getId().toString());
                organizerData.put("registrationId", registration.getId().toString());

                String attendeeName = attendee.getAttendeeProfile() != null && attendee.getAttendeeProfile().getDisplayName() != null
                        ? attendee.getAttendeeProfile().getDisplayName()
                        : attendee.getEmail();

                int ticketCount = event.tickets() != null ? event.tickets().size() : 0;

                Notification organizerNotification = Notification.builder()
                        .user(organizer)
                        .type(NotificationType.TICKET_CONFIRMED)
                        .title("Đăng ký vé mới")
                        .body("Người dùng " + attendeeName + " vừa đăng ký thành công " + ticketCount + " vé cho sự kiện '" + eventTitle + "'.")
                        .data(organizerData)
                        .isRead(false)
                        .build();
                notificationRepository.save(organizerNotification);
                log.info("New registration notification created for organizer: {}", organizer.getEmail());
            }
        } catch (Exception e) {
            log.error("Failed to create notifications for registration: {}", e.getMessage(), e);
        }
    }
}
