package com.eventhub.infrastructure.payment;

import com.eventhub.web.dto.request.PaymentRequest;
import com.eventhub.web.dto.response.PaymentResponse;

public interface PaymentStrategy {
    PaymentResponse processPayment(PaymentRequest request);
    String getProviderName();
}
