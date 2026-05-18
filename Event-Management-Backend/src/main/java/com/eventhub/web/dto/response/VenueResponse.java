package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VenueResponse {

    private UUID id;
    private String name;
    private String address;
    private String city;
    private Integer capacity;
    private String imageUrl;
    private Instant createdAt;
    private Instant updatedAt;
}
