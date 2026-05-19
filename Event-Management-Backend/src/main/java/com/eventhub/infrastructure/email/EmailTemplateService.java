package com.eventhub.infrastructure.email;

import com.eventhub.domain.entity.Registration;
import com.eventhub.domain.entity.Ticket;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.entity.WithdrawalRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailTemplateService {

    private final SpringTemplateEngine templateEngine;

    public String renderVerificationEmail(String displayName, String verificationUrl) {
        Context context = new Context();
        context.setVariable("displayName", displayName);
        context.setVariable("verificationUrl", verificationUrl);
        return templateEngine.process("email/verification", context);
    }

    public String renderTicketConfirmation(Registration registration, List<Ticket> tickets, User attendee) {
        Context context = new Context();
        context.setVariable("registration", registration);
        context.setVariable("tickets", tickets);
        context.setVariable("attendee", attendee);
        context.setVariable("event", registration.getEvent());
        return templateEngine.process("email/ticket-confirmation", context);
    }

    public String renderWithdrawalResult(WithdrawalRequest request, User organizer) {
        Context context = new Context();
        context.setVariable("request", request);
        context.setVariable("organizer", organizer);
        context.setVariable("status", request.getStatus().name());
        return templateEngine.process("email/withdrawal-result", context);
    }

    public String renderOtpEmail(String title, String message, String otp, long expiryMinutes) {
        Context context = new Context();
        context.setVariable("title", title);
        context.setVariable("message", message);
        context.setVariable("otp", otp);
        context.setVariable("expiryMinutes", expiryMinutes);
        return templateEngine.process("email/otp-verification", context);
    }

    public String renderInvitation(String eventTitle, String inviteLink) {
        Context context = new Context();
        context.setVariable("eventTitle", eventTitle);
        context.setVariable("inviteLink", inviteLink);
        return templateEngine.process("email/invitation", context);
    }
}
