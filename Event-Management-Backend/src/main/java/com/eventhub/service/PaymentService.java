package com.eventhub.service;

import com.eventhub.infrastructure.payment.PaymentStrategy;
import com.eventhub.web.dto.request.PaymentRequest;
import com.eventhub.web.dto.response.PaymentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final List<PaymentStrategy> strategies;

    public PaymentResponse processPayment(PaymentRequest request, String provider) {
        PaymentStrategy strategy = strategies.stream()
                .filter(s -> s.getProviderName().equalsIgnoreCase(provider))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unsupported payment provider: " + provider));

        return strategy.processPayment(request);
    }
}
