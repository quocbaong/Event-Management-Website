package com.eventhub.service;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.QrCode;
import com.eventhub.domain.entity.Registration;
import com.eventhub.domain.entity.Ticket;
import com.eventhub.domain.entity.TicketType;
import com.eventhub.domain.entity.Transaction;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.RegistrationStatus;
import com.eventhub.domain.enums.TicketStatus;
import com.eventhub.domain.enums.TransactionStatus;
import com.eventhub.domain.enums.TransactionType;
import com.eventhub.domain.event.RegistrationConfirmedEvent;
import com.eventhub.exception.InvalidOperationException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.QrCodeRepository;
import com.eventhub.repository.RegistrationRepository;
import com.eventhub.repository.TicketRepository;
import com.eventhub.repository.TicketTypeRepository;
import com.eventhub.repository.TransactionRepository;
import com.eventhub.infrastructure.qrcode.QrCodeService;
import com.eventhub.web.dto.request.PaymentRequest;
import com.eventhub.web.dto.request.RegisterEventRequest;
import com.eventhub.web.dto.request.TicketSelection;
import com.eventhub.web.dto.response.PaymentResponse;
import com.eventhub.web.dto.response.RegistrationDetailResponse;
import com.eventhub.web.dto.response.RegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final TicketRepository ticketRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final TransactionRepository transactionRepository;
    private final QrCodeRepository qrCodeRepository;
    private final EventRepository eventRepository;
    private final PaymentService paymentService;
    private final ApplicationEventPublisher eventPublisher;
    private final QrCodeService qrCodeService;

    @Caching(evict = {
        @CacheEvict(value = "eventDetail", allEntries = true),
        @CacheEvict(value = "featuredEvents", allEntries = true),
        @CacheEvict(value = "upcomingEvents", allEntries = true)
    })
    public RegistrationDetailResponse register(User attendee, UUID eventId, RegisterEventRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (event.getStatus() != com.eventhub.domain.enums.EventStatus.PUBLISHED) {
            throw new InvalidOperationException("Event is not published");
        }

        if (Boolean.FALSE.equals(event.getIsSalesActive())) {
            throw new InvalidOperationException("Vé sự kiện hiện đang tạm ngưng mở bán.");
        }

        if (registrationRepository.existsByEventIdAndAttendeeId(eventId, attendee.getId())) {
            throw new InvalidOperationException("Bạn đã đăng ký tham gia sự kiện này rồi.");
        }

        List<Ticket> tickets = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (TicketSelection selection : request.getTickets()) {
            TicketType ticketType = ticketTypeRepository.findById(selection.getTicketTypeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ticket type not found with id: " + selection.getTicketTypeId()));

            if (!ticketType.getEvent().getId().equals(eventId)) {
                throw new InvalidOperationException("Ticket type " + selection.getTicketTypeId() + " does not belong to this event");
            }

            if (!ticketType.getIsActive()) {
                throw new InvalidOperationException("Ticket type '" + ticketType.getName() + "' is not active");
            }

            int available = ticketType.getTotalQuantity() - ticketType.getSoldQuantity();
            if (selection.getQuantity() > available) {
                throw new InvalidOperationException("Not enough tickets available for '" + ticketType.getName()
                        + "'. Requested: " + selection.getQuantity() + ", available: " + available);
            }

            if (request.getTickets().size() == 1 && selection.getQuantity() > ticketType.getMaxPerOrder()) {
                throw new InvalidOperationException("Maximum " + ticketType.getMaxPerOrder()
                        + " tickets per order for '" + ticketType.getName() + "'");
            }

            for (int i = 0; i < selection.getQuantity(); i++) {
                Ticket ticket = Ticket.builder()
                        .ticketType(ticketType)
                        .ticketCode(generateTicketCode())
                        .status(TicketStatus.ACTIVE)
                        .holderName(attendee.getAttendeeProfile() != null
                                ? attendee.getAttendeeProfile().getDisplayName() : attendee.getEmail())
                        .holderEmail(attendee.getEmail())
                        .build();
                tickets.add(ticket);
            }

            totalAmount = totalAmount.add(ticketType.getPrice().multiply(BigDecimal.valueOf(selection.getQuantity())));
        }

        BigDecimal finalAmount = totalAmount;
        boolean isFree = finalAmount.compareTo(BigDecimal.ZERO) == 0;

        Registration registration = Registration.builder()
                .event(event)
                .attendee(attendee)
                .status(isFree ? RegistrationStatus.CONFIRMED : RegistrationStatus.PENDING)
                .confirmedAt(isFree ? Instant.now() : null)
                .totalAmount(totalAmount)
                .discountAmount(BigDecimal.ZERO)
                .finalAmount(finalAmount)
                .couponCode(request.getCouponCode())
                .notes(request.getNotes())
                .build();

        registration = registrationRepository.save(registration);

        for (Ticket ticket : tickets) {
            ticket.setRegistration(registration);
        }
        ticketRepository.saveAll(tickets);
        registration.setTickets(tickets);

        if (isFree) {
            for (Ticket ticket : tickets) {
                TicketType ticketType = ticket.getTicketType();
                ticketType.setSoldQuantity(ticketType.getSoldQuantity() + 1);
                ticketTypeRepository.save(ticketType);

                String qrToken = "QR-" + ticket.getId().toString().substring(0, 8) + "-" + UUID.randomUUID().toString().substring(0, 8);
                String qrContent = "ticket://event/" + event.getId() + "/ticket/" + ticket.getTicketCode();
                String imageUrl = qrCodeService.generateQrImage(qrContent);
                QrCode qrCode = QrCode.builder()
                        .ticket(ticket)
                        .token(qrToken)
                        .imageUrl(imageUrl)
                        .build();
                qrCodeRepository.save(qrCode);
                ticket.setQrCode(qrCode);
            }

            eventPublisher.publishEvent(new RegistrationConfirmedEvent(
                    registration, tickets, attendee));

            return toDetailResponse(registration, tickets);
        }

        Transaction transaction = Transaction.builder()
                .user(attendee)
                .event(event)
                .registration(registration)
                .type(TransactionType.TICKET_SALE)
                .status(TransactionStatus.PENDING)
                .amount(finalAmount)
                .description("Ticket purchase: " + event.getTitle())
                .build();
        transactionRepository.save(transaction);

        PaymentRequest paymentReq = PaymentRequest.builder()
                .registrationId(registration.getId())
                .amount(finalAmount)
                .description("Ticket purchase: " + event.getTitle())
                .build();

        PaymentResponse paymentResponse = paymentService.processPayment(paymentReq, "MOCK");

        RegistrationDetailResponse detail = toDetailResponse(registration, tickets);
        detail.setPaymentUrl(paymentResponse.getPaymentUrl());
        return detail;
    }

    @Caching(evict = {
        @CacheEvict(value = "eventDetail", allEntries = true),
        @CacheEvict(value = "featuredEvents", allEntries = true),
        @CacheEvict(value = "upcomingEvents", allEntries = true)
    })
    public RegistrationDetailResponse confirmRegistration(UUID eventId, UUID registrationId) {
        Registration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found with id: " + registrationId));

        if (!registration.getEvent().getId().equals(eventId)) {
            throw new ResourceNotFoundException("Registration not found for this event");
        }

        if (registration.getStatus() != RegistrationStatus.PENDING) {
            throw new InvalidOperationException("Registration is not in PENDING status");
        }

        Transaction transaction = null;
        var transactions = transactionRepository.findAll();
        for (Transaction t : transactions) {
            if (t.getRegistration() != null && t.getRegistration().getId().equals(registrationId)) {
                transaction = t;
                break;
            }
        }

        if (transaction != null) {
            transaction.setStatus(TransactionStatus.SUCCESS);
            transactionRepository.save(transaction);
        }

        registration.setStatus(RegistrationStatus.CONFIRMED);
        registration.setConfirmedAt(Instant.now());
        registration = registrationRepository.save(registration);

        for (Ticket ticket : registration.getTickets()) {
            TicketType ticketType = ticket.getTicketType();
            ticketType.setSoldQuantity(ticketType.getSoldQuantity() + 1);
            ticketTypeRepository.save(ticketType);

            String qrToken = "QR-" + ticket.getId().toString().substring(0, 8) + "-" + UUID.randomUUID().toString().substring(0, 8);
            String qrContent = "ticket://event/" + eventId + "/ticket/" + ticket.getTicketCode();
            String imageUrl = qrCodeService.generateQrImage(qrContent);
            QrCode qrCode = QrCode.builder()
                    .ticket(ticket)
                    .token(qrToken)
                    .imageUrl(imageUrl)
                    .build();
            qrCodeRepository.save(qrCode);
            ticket.setQrCode(qrCode);
        }

        eventPublisher.publishEvent(new RegistrationConfirmedEvent(
                registration, registration.getTickets(), registration.getAttendee()));

        return toDetailResponse(registration, registration.getTickets());
    }

    @Transactional(readOnly = true)
    public List<RegistrationResponse> getEventRegistrations(UUID eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        return registrationRepository.findByEventIdOrderByCreatedAtDesc(eventId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public RegistrationDetailResponse getRegistrationDetail(UUID eventId, UUID registrationId) {
        Registration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found with id: " + registrationId));

        if (!registration.getEvent().getId().equals(eventId)) {
            throw new ResourceNotFoundException("Registration not found for this event");
        }

        return toDetailResponse(registration, registration.getTickets());
    }

    private String generateTicketCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder code = new StringBuilder("TKT-");
        for (int i = 0; i < 8; i++) {
            code.append(chars.charAt((int) (Math.random() * chars.length())));
        }
        return code.toString();
    }

    private RegistrationResponse toResponse(Registration reg) {
        return RegistrationResponse.builder()
                .id(reg.getId())
                .eventId(reg.getEvent().getId())
                .eventTitle(reg.getEvent().getTitle())
                .attendeeId(reg.getAttendee().getId())
                .attendeeName(reg.getAttendee().getAttendeeProfile() != null
                        ? reg.getAttendee().getAttendeeProfile().getDisplayName() : reg.getAttendee().getEmail())
                .attendeeEmail(reg.getAttendee().getEmail())
                .status(reg.getStatus().name())
                .totalAmount(reg.getTotalAmount())
                .finalAmount(reg.getFinalAmount())
                .createdAt(reg.getCreatedAt())
                .build();
    }

    private RegistrationDetailResponse toDetailResponse(Registration reg, List<Ticket> tickets) {
        List<RegistrationDetailResponse.TicketItem> ticketItems = tickets.stream()
                .map(t -> RegistrationDetailResponse.TicketItem.builder()
                        .id(t.getId())
                        .ticketCode(t.getTicketCode())
                        .ticketTypeName(t.getTicketType().getName())
                        .ticketPrice(t.getTicketType().getPrice())
                        .status(t.getStatus().name())
                        .qrCodeToken(t.getQrCode() != null ? t.getQrCode().getToken() : null)
                        .qrImageUrl(t.getQrCode() != null ? t.getQrCode().getImageUrl() : null)
                        .build())
                .toList();

        return RegistrationDetailResponse.builder()
                .id(reg.getId())
                .eventId(reg.getEvent().getId())
                .eventTitle(reg.getEvent().getTitle())
                .eventStartDate(reg.getEvent().getStartDate())
                .eventEndDate(reg.getEvent().getEndDate())
                .eventVenue(reg.getEvent().getVenue())
                .eventCategory(reg.getEvent().getCategory() != null ? reg.getEvent().getCategory().name() : null)
                .eventBannerUrl(reg.getEvent().getBannerUrl())
                .attendeeId(reg.getAttendee().getId())
                .attendeeName(reg.getAttendee().getAttendeeProfile() != null
                        ? reg.getAttendee().getAttendeeProfile().getDisplayName() : reg.getAttendee().getEmail())
                .attendeeEmail(reg.getAttendee().getEmail())
                .status(reg.getStatus().name())
                .totalAmount(reg.getTotalAmount())
                .discountAmount(reg.getDiscountAmount())
                .finalAmount(reg.getFinalAmount())
                .couponCode(reg.getCouponCode())
                .notes(reg.getNotes())
                .confirmedAt(reg.getConfirmedAt())
                .cancelledAt(reg.getCancelledAt())
                .createdAt(reg.getCreatedAt())
                .tickets(ticketItems)
                .build();
    }

    @Transactional(readOnly = true)
    public List<RegistrationDetailResponse> getAttendeeRegistrations(User attendee) {
        List<Registration> regs = registrationRepository.findByAttendeeIdOrderByCreatedAtDesc(attendee.getId());
        return regs.stream()
                .map(r -> toDetailResponse(r, r.getTickets()))
                .toList();
    }
}
