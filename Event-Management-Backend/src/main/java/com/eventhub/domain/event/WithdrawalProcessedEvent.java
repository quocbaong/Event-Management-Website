package com.eventhub.domain.event;

import com.eventhub.domain.entity.WithdrawalRequest;
import com.eventhub.domain.entity.User;

public record WithdrawalProcessedEvent(
    WithdrawalRequest request,
    User organizer
) {}
