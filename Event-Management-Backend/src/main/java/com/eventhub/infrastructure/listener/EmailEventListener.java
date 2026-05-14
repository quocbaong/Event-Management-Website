package com.eventhub.infrastructure.listener;

import com.eventhub.domain.entity.OrganizerProfile;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.event.RegistrationConfirmedEvent;
import com.eventhub.domain.event.WithdrawalProcessedEvent;
import com.eventhub.infrastructure.email.EmailService;
import com.eventhub.infrastructure.email.EmailTemplateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailEventListener {

    private final EmailService emailService;
    private final EmailTemplateService emailTemplateService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleRegistrationConfirmed(RegistrationConfirmedEvent event) {
        try {
            String displayName = getAttendeeDisplayName(event.attendee());
            String html = emailTemplateService.renderTicketConfirmation(
                    event.registration(),
                    event.tickets(),
                    event.attendee()
            );
            emailService.sendHtmlMessage(
                    event.attendee().getEmail(),
                    "Xác nhận đăng ký sự kiện - " + event.registration().getEvent().getTitle(),
                    html
            );
            log.info("Ticket confirmation email queued for {} on event {}",
                    event.attendee().getEmail(), event.registration().getEvent().getTitle());
        } catch (Exception e) {
            log.error("Failed to send ticket confirmation for registration {}: {}",
                    event.registration().getId(), e.getMessage());
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleWithdrawalProcessed(WithdrawalProcessedEvent event) {
        try {
            String displayName = getOrganizerDisplayName(event.organizer());
            String html = emailTemplateService.renderWithdrawalResult(
                    event.request(),
                    event.organizer()
            );
            boolean isApproved = switch (event.request().getStatus()) {
                case COMPLETED -> true;
                default -> false;
            };
            String subject = isApproved
                    ? "Yêu cầu rút tiền đã được xử lý thành công"
                    : "Yêu cầu rút tiền đã bị từ chối";
            emailService.sendHtmlMessage(
                    event.organizer().getEmail(),
                    subject,
                    html
            );
            log.info("Withdrawal result email sent to {} for request {}",
                    event.organizer().getEmail(), event.request().getId());
        } catch (Exception e) {
            log.error("Failed to send withdrawal result for request {}: {}",
                    event.request().getId(), e.getMessage());
        }
    }

    private String getAttendeeDisplayName(User user) {
        if (user.getAttendeeProfile() != null && user.getAttendeeProfile().getDisplayName() != null) {
            return user.getAttendeeProfile().getDisplayName();
        }
        return user.getEmail();
    }

    private String getOrganizerDisplayName(User user) {
        if (user.getOrganizerProfile() != null && user.getOrganizerProfile().getCompanyName() != null) {
            return user.getOrganizerProfile().getCompanyName();
        }
        if (user.getAttendeeProfile() != null && user.getAttendeeProfile().getDisplayName() != null) {
            return user.getAttendeeProfile().getDisplayName();
        }
        return user.getEmail();
    }
}
