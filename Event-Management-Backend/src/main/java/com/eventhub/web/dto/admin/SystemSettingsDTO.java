package com.eventhub.web.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SystemSettingsDTO {
    // Finance Config
    private String currency;
    private String commissionRate;
    private String subscriptionPlan;

    // API Integration
    private boolean stripeActive;
    private boolean sendGridActive;

    // Security
    private boolean twoFactorEnabled;
    private String sessionTimeout;
    private String minPasswordLength;

    // Branding
    private String primaryColor;
    private String fontFamily;
    private String logoUrl;
}
