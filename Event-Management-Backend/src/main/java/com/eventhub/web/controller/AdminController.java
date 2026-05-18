package com.eventhub.web.controller;

import com.eventhub.service.AdminService;
import com.eventhub.web.dto.admin.DashboardResponse;
import com.eventhub.web.dto.admin.GlobalEventsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboardStats(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year) {
        return ResponseEntity.ok(adminService.getDashboardStats(month, year));
    }
    
    @GetMapping("/dashboard/export")
    public ResponseEntity<byte[]> exportDashboardReport(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year) {
        
        byte[] csvData = adminService.exportDashboardReport(month, year);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv; charset=UTF-8"));
        headers.setContentDispositionFormData("attachment", "dashboard_report.csv");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(csvData);
    }

    @GetMapping("/events")
    public ResponseEntity<GlobalEventsResponse> getGlobalEvents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String organizerRole,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(adminService.getGlobalEvents(search, category, organizerRole, status, page, size));
    }

    @PostMapping("/events/{id}/approve")
    public ResponseEntity<Void> approveEvent(@PathVariable UUID id) {
        adminService.approveEvent(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/events/{id}/suspend")
    public ResponseEntity<Void> suspendEvent(@PathVariable UUID id) {
        adminService.suspendEvent(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/events/bulk-approve")
    public ResponseEntity<Void> bulkApprove(@RequestBody List<UUID> ids) {
        adminService.bulkApprove(ids);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/events/bulk-suspend")
    public ResponseEntity<Void> bulkSuspend(@RequestBody List<UUID> ids) {
        adminService.bulkSuspend(ids);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/broadcast")
    public ResponseEntity<com.eventhub.web.dto.admin.BroadcastPageResponse> getBroadcastData() {
        return ResponseEntity.ok(adminService.getBroadcastData());
    }

    @PostMapping("/broadcast")
    public ResponseEntity<Void> sendBroadcast(@RequestBody com.eventhub.web.dto.admin.BroadcastRequest request) {
        adminService.sendBroadcast(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/feedback")
    public ResponseEntity<com.eventhub.web.dto.admin.FeedbackPageResponse> getFeedbackData() {
        return ResponseEntity.ok(adminService.getFeedbackData());
    }

    @PostMapping("/feedback/action")
    public ResponseEntity<Void> processFeedbackAction(@RequestBody com.eventhub.web.dto.admin.FeedbackActionRequest request) {
        adminService.processFeedbackAction(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/settings")
    public ResponseEntity<com.eventhub.web.dto.admin.SystemSettingsDTO> getSystemSettings() {
        return ResponseEntity.ok(adminService.getSystemSettings());
    }

    @PostMapping("/settings")
    public ResponseEntity<Void> saveSystemSettings(@RequestBody com.eventhub.web.dto.admin.SystemSettingsDTO dto) {
        adminService.saveSystemSettings(dto);
        return ResponseEntity.ok().build();
    }
}


