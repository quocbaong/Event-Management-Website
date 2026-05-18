package com.eventhub.service;

import com.eventhub.web.dto.admin.DashboardResponse;
import com.eventhub.web.dto.admin.GlobalEventsResponse;
import java.util.List;
import java.util.UUID;

public interface AdminService {
    DashboardResponse getDashboardStats(Integer month, Integer year);
    byte[] exportDashboardReport(Integer month, Integer year);
    GlobalEventsResponse getGlobalEvents(String search, String category, String organizerRole, String status, int page, int size);
    void approveEvent(UUID id);
    void suspendEvent(UUID id);
    void bulkApprove(List<UUID> ids);
    void bulkSuspend(List<UUID> ids);
}

