package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationDetailResponse {
    private UUID id;
    private UUID eventId;
    private String eventTitle;
    private Instant eventStartDate;
    private Instant eventEndDate;
    private String eventVenue;
    private String eventCategory;
    private String eventBannerUrl;
    private UUID attendeeId;
    private String attendeeName;
    private String attendeeEmail;
    private String status;
    private BigDecimal totalAmount;
    private BigDecimal discountAmount;
    private BigDecimal finalAmount;
    private String couponCode;
    private String notes;
    private Instant confirmedAt;
    private Instant cancelledAt;
    private Instant createdAt;
    private List<TicketItem> tickets;
    private String paymentUrl;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TicketItem {
        private UUID id;
        private String ticketCode;
        private String ticketTypeName;
        private BigDecimal ticketPrice;
        private String status;
        private String qrCodeToken;
        private String qrImageUrl;
    }
}
