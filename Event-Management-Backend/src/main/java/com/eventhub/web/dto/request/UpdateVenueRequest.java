package com.eventhub.web.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateVenueRequest {

    private String name;

    private String address;

    private String city;

    private Integer capacity;

    private String imageUrl;
}
