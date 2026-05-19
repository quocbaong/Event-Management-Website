package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversionFunnelData {
    private List<ConversionFunnelResponse> stages;
    private double cartConversionRate;
    private double cartAbandonmentRate;
    private BigDecimal averageOrderValue;
}
