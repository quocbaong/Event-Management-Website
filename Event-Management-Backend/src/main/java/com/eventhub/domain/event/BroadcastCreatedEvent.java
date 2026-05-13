package com.eventhub.domain.event;

import com.eventhub.domain.entity.Broadcast;

public record BroadcastCreatedEvent(
    Broadcast broadcast
) {}
