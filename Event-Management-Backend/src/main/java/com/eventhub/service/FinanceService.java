package com.eventhub.service;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.Registration;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.RegistrationStatus;
import com.eventhub.domain.enums.TransactionStatus;
import com.eventhub.domain.enums.TransactionType;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.RegistrationRepository;
import com.eventhub.repository.TransactionRepository;
import com.eventhub.domain.entity.Transaction;
import com.eventhub.web.dto.response.FinanceOverviewResponse;
import com.eventhub.web.dto.response.TransactionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FinanceService {

    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;
    private final TransactionRepository transactionRepository;

    public FinanceOverviewResponse getOverview(User organizer) {
        List<Event> events = eventRepository.findByOrganizerIdOrderByCreatedAtDesc(organizer.getId());

        if (events.isEmpty()) {
            return FinanceOverviewResponse.builder()
                    .totalRevenue(BigDecimal.ZERO)
                    .platformFee(BigDecimal.ZERO)
                    .refund(BigDecimal.ZERO)
                    .netRevenue(BigDecimal.ZERO)
                    .build();
        }

        List<UUID> eventIds = events.stream().map(Event::getId).toList();

        BigDecimal totalRevenue = registrationRepository.findByEventIdIn(eventIds)
                .stream()
                .filter(r -> r.getStatus() == RegistrationStatus.CONFIRMED)
                .map(Registration::getFinalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, BigDecimal> feeMap = new HashMap<>();
        List<Object[]> feeRows = transactionRepository.sumByTypeAndStatus(eventIds, TransactionStatus.SUCCESS);
        for (Object[] row : feeRows) {
            String type = ((Enum<?>) row[0]).name();
            BigDecimal amount = row[1] != null ? (BigDecimal) row[1] : BigDecimal.ZERO;
            feeMap.put(type, amount);
        }

        BigDecimal platformFee = feeMap.getOrDefault(TransactionType.PLATFORM_FEE.name(), BigDecimal.ZERO);
        BigDecimal refund = feeMap.getOrDefault(TransactionType.REFUND.name(), BigDecimal.ZERO);
        BigDecimal netRevenue = totalRevenue.subtract(platformFee).subtract(refund);

        return FinanceOverviewResponse.builder()
                .totalRevenue(totalRevenue)
                .platformFee(platformFee)
                .refund(refund)
                .netRevenue(netRevenue)
                .build();
    }

    public List<TransactionResponse> getTransactions(User organizer) {
        List<Event> events = eventRepository.findByOrganizerIdOrderByCreatedAtDesc(organizer.getId());

        if (events.isEmpty()) {
            return List.of();
        }

        List<UUID> eventIds = events.stream().map(Event::getId).toList();
        List<Transaction> transactions = transactionRepository
                .findByEventIdInOrderByCreatedAtDesc(eventIds);

        return transactions.stream()
                .map(this::toTransactionResponse)
                .collect(Collectors.toList());
    }

    private TransactionResponse toTransactionResponse(Transaction t) {
        return TransactionResponse.builder()
                .id(t.getId())
                .eventId(t.getEvent() != null ? t.getEvent().getId() : null)
                .eventTitle(t.getEvent() != null ? t.getEvent().getTitle() : null)
                .userName(t.getUser().getAttendeeProfile() != null
                        ? t.getUser().getAttendeeProfile().getDisplayName() : t.getUser().getEmail())
                .userEmail(t.getUser().getEmail())
                .amount(t.getAmount())
                .fee(t.getFee())
                .type(t.getType().name())
                .status(t.getStatus().name())
                .paymentMethod(t.getPaymentMethod())
                .description(t.getDescription())
                .createdAt(t.getCreatedAt())
                .build();
    }
}
