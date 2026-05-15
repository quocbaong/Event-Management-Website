package com.eventhub.infrastructure.payment;

import com.eventhub.web.dto.request.PaymentRequest;
import com.eventhub.web.dto.response.PaymentResponse;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MockPaymentStrategy implements PaymentStrategy {

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        // In a real mock, you might redirect to a success/failure page
        // For development, we return a mock success URL
        return PaymentResponse.builder()
                .paymentId("MOCK-" + UUID.randomUUID().toString().substring(0, 8))
                .status("PENDING")
                .paymentUrl("http://localhost:8080/api/v1/test/payment-mock-ui?regId=" + request.getRegistrationId())
                .message("Redirect to mock payment gateway")
                .build();
    }

    @Override
    public String getProviderName() {
        return "MOCK";
    }
}
