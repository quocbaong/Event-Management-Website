package com.eventhub.domain.event;

import com.eventhub.domain.entity.Registration;
import com.eventhub.domain.entity.Ticket;
import com.eventhub.domain.entity.User;

import java.util.List;

public record RegistrationConfirmedEvent(
    Registration registration,
    List<Ticket> tickets,
    User attendee
) {}
