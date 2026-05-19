package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventPerformanceResponse {
    private String name;
    private String type;
    private String tickets;
    private int checkin;
    private String revenue;
    private String status;
}
