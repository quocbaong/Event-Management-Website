package com.eventhub.web.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterEventRequest {
    @NotEmpty
    @Valid
    private List<TicketSelection> tickets;

    private String couponCode;

    private String notes;
}
