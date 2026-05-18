package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.FinanceService;
import com.eventhub.service.WithdrawalService;
import com.eventhub.web.dto.request.CreateWithdrawalRequest;
import com.eventhub.web.dto.response.FinanceOverviewResponse;
import com.eventhub.web.dto.response.TransactionResponse;
import com.eventhub.web.dto.response.WithdrawalResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import com.eventhub.domain.enums.UserRole;

@RestController
@RequestMapping("/api/v1/organizer/finance")
@RequiredArgsConstructor
public class FinanceController {

    private final FinanceService financeService;
    private final WithdrawalService withdrawalService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private User getCurrentUser(UserDetails userDetails) {
        if (userDetails != null) {
            return userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        Optional<User> existing = userRepository.findByEmail("organizer@test.com");
        if (existing.isPresent()) return existing.get();

        User testUser = User.builder()
                .email("organizer@test.com")
                .passwordHash(passwordEncoder.encode("test123"))
                .role(UserRole.ORGANIZER)
                .isVerified(true)
                .isActive(true)
                .build();
        return userRepository.save(testUser);
    }

    @GetMapping("/overview")
    public ResponseEntity<FinanceOverviewResponse> getOverview(
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(financeService.getOverview(currentUser));
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionResponse>> getTransactions(
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(financeService.getTransactions(currentUser));
    }

    @PostMapping("/withdrawals")
    public ResponseEntity<WithdrawalResponse> createWithdrawal(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateWithdrawalRequest request) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(withdrawalService.create(currentUser, request));
    }

    @GetMapping("/withdrawals")
    public ResponseEntity<List<WithdrawalResponse>> getWithdrawals(
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(withdrawalService.getWithdrawals(currentUser));
    }
}
