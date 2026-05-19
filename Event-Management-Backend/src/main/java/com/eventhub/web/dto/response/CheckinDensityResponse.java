package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckinDensityResponse {
    private List<DensityPoint> thu;
    private List<DensityPoint> gio;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DensityPoint {
        private String label;
        private long w1;
        private long w2;
        private long w3;
        private long w4;
    }
}
