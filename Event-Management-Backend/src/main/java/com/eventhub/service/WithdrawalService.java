package com.eventhub.service;

import com.eventhub.domain.entity.User;
import com.eventhub.domain.entity.WithdrawalRequest;
import com.eventhub.domain.enums.WithdrawalStatus;
import com.eventhub.exception.InvalidOperationException;
import com.eventhub.repository.WithdrawalRequestRepository;
import com.eventhub.web.dto.request.CreateWithdrawalRequest;
import com.eventhub.web.dto.response.WithdrawalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class WithdrawalService {

    private final WithdrawalRequestRepository withdrawalRequestRepository;
    private final FinanceService financeService;

    public WithdrawalResponse create(User organizer, CreateWithdrawalRequest request) {
        BigDecimal netRevenue = financeService.getOverview(organizer).getNetRevenue();

        List<WithdrawalRequest> pendingWithdrawals = withdrawalRequestRepository
                .findByOrganizerIdAndStatusIn(organizer.getId(),
                        List.of(WithdrawalStatus.PENDING, WithdrawalStatus.PROCESSING));

        BigDecimal pendingTotal = pendingWithdrawals.stream()
                .map(WithdrawalRequest::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal available = netRevenue.subtract(pendingTotal);

        if (request.getAmount().compareTo(available) > 0) {
            throw new InvalidOperationException(
                    "Insufficient balance. Available: " + available + ", requested: " + request.getAmount());
        }

        WithdrawalRequest withdrawal = WithdrawalRequest.builder()
                .organizer(organizer)
                .amount(request.getAmount())
                .bankName(request.getBankName())
                .bankAccount(request.getBankAccount())
                .accountOwner(request.getAccountOwner())
                .status(WithdrawalStatus.PENDING)
                .build();

        withdrawal = withdrawalRequestRepository.save(withdrawal);
        return toResponse(withdrawal);
    }

    @Transactional(readOnly = true)
    public List<WithdrawalResponse> getWithdrawals(User organizer) {
        return withdrawalRequestRepository
                .findByOrganizerIdOrderByCreatedAtDesc(organizer.getId())
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private WithdrawalResponse toResponse(WithdrawalRequest w) {
        return WithdrawalResponse.builder()
                .id(w.getId())
                .amount(w.getAmount())
                .bankName(w.getBankName())
                .bankAccount(w.getBankAccount())
                .accountOwner(w.getAccountOwner())
                .status(w.getStatus().name())
                .note(w.getNote())
                .requestedAt(w.getRequestedAt())
                .processedAt(w.getProcessedAt())
                .createdAt(w.getCreatedAt())
                .build();
    }
}
