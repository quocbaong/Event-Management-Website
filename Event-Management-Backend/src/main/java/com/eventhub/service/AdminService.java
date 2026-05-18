package com.eventhub.service;

import com.eventhub.web.dto.admin.DashboardResponse;
import com.eventhub.web.dto.admin.GlobalEventsResponse;
import com.eventhub.web.dto.admin.BroadcastPageResponse;
import com.eventhub.web.dto.admin.BroadcastRequest;
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
    BroadcastPageResponse getBroadcastData();
    void sendBroadcast(BroadcastRequest request);
    com.eventhub.web.dto.admin.FeedbackPageResponse getFeedbackData();
    void processFeedbackAction(com.eventhub.web.dto.admin.FeedbackActionRequest request);
    com.eventhub.web.dto.admin.SystemSettingsDTO getSystemSettings();
    void saveSystemSettings(com.eventhub.web.dto.admin.SystemSettingsDTO dto);
}


