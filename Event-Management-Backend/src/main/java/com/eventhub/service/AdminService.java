package com.eventhub.service;

import com.eventhub.web.dto.admin.DashboardResponse;

public interface AdminService {
    DashboardResponse getDashboardStats(Integer month, Integer year);
    byte[] exportDashboardReport(Integer month, Integer year);
}
