package com.eventhub.web.controller;

import com.eventhub.service.AdminService;
import com.eventhub.web.dto.admin.DashboardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
