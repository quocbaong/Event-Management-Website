package com.eventhub.service;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.Invitation;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.InviteStatus;
import com.eventhub.exception.InvalidOperationException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.infrastructure.email.EmailService;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.InvitationRepository;
import com.eventhub.web.dto.request.CreateInvitationRequest;
import com.eventhub.web.dto.response.InvitationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class InvitationService {

    private final InvitationRepository invitationRepository;
    private final EventRepository eventRepository;
    private final EmailService emailService;
    private final com.eventhub.infrastructure.email.EmailTemplateService emailTemplateService;

    public List<InvitationResponse> createInvitations(User organizer, UUID eventId, CreateInvitationRequest request) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (event.getStatus() != com.eventhub.domain.enums.EventStatus.PUBLISHED) {
            throw new InvalidOperationException("Cannot send invitations for a non-published event");
        }

        List<InvitationResponse> responses = new ArrayList<>();

        for (String email : request.getEmails()) {
            if (invitationRepository.existsByEventIdAndEmail(eventId, email)) {
                log.warn("Invitation already exists for {} on event {}", email, eventId);
                continue;
            }

            String token = UUID.randomUUID().toString().replace("-", "") +
                    UUID.randomUUID().toString().replace("-", "").substring(0, 8);

            Invitation invitation = Invitation.builder()
                    .event(event)
                    .invitedBy(organizer)
                    .email(email)
                    .token(token)
                    .build();

            invitation = invitationRepository.save(invitation);
            sendInvitationEmail(event, email, token);

            responses.add(toResponse(invitation));
        }

        return responses;
    }

    @Transactional(readOnly = true)
    public List<InvitationResponse> getInvitations(UUID eventId) {
        eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        return invitationRepository.findByEventIdOrderByCreatedAtDesc(eventId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public InvitationResponse acceptInvitation(String token) {
        Invitation invitation = invitationRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thư mời hoặc mã token không hợp lệ"));

        if (invitation.getStatus() == InviteStatus.ACCEPTED) {
            return toResponse(invitation);
        }

        if (invitation.getStatus() != InviteStatus.PENDING) {
            throw new InvalidOperationException("Thư mời này đã ở trạng thái: " + invitation.getStatus().name());
        }

        invitation.setStatus(InviteStatus.ACCEPTED);
        invitation.setRespondedAt(Instant.now());
        invitation = invitationRepository.save(invitation);

        return toResponse(invitation);
    }

    private void sendInvitationEmail(Event event, String toEmail, String token) {
        try {
            String inviteLink = "http://localhost:5173/invitations/" + token;
            String subject = "Lời mời tham dự sự kiện: " + event.getTitle();
            String html = emailTemplateService.renderInvitation(event.getTitle(), inviteLink);
            emailService.sendHtmlMessage(toEmail, subject, html);
            log.info("Invitation email sent to {} for event {}", toEmail, event.getId());
        } catch (Exception e) {
            log.error("Failed to send invitation email to {}: {}", toEmail, e.getMessage());
        }
    }

    private InvitationResponse toResponse(Invitation inv) {
        return InvitationResponse.builder()
                .id(inv.getId())
                .eventId(inv.getEvent().getId())
                .eventTitle(inv.getEvent().getTitle())
                .email(inv.getEmail())
                .token(inv.getToken())
                .status(inv.getStatus().name())
                .sentAt(inv.getSentAt())
                .respondedAt(inv.getRespondedAt())
                .createdAt(inv.getCreatedAt())
                .build();
    }
}
