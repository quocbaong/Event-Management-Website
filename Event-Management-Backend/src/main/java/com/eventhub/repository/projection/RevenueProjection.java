package com.eventhub.repository.projection;

import java.math.BigDecimal;

public interface RevenueProjection {
    String getGroupKey();
    String getGroupLabel();
    BigDecimal getRevenue();
    Long getCount();
}
