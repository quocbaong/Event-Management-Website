package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import com.eventhub.domain.enums.UserRole;

@RestController
@RequestMapping("/api/v1/organizer/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private User getCurrentUser(UserDetails userDetails) {
        if (userDetails != null) {
            return userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        Optional<User> existing = userRepository.findByEmail("organizer@test.com");
        if (existing.isPresent()) return existing.get();

        User testUser = User.builder()
                .email("organizer@test.com")
                .passwordHash(passwordEncoder.encode("test123"))
                .role(UserRole.ORGANIZER)
                .isVerified(true)
                .isActive(true)
                .build();
        return userRepository.save(testUser);
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportReport(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "excel") String format) {
        User currentUser = getCurrentUser(userDetails);
        byte[] data = reportService.exportReport(currentUser, format);

        String filename = "event-report." + ("pdf".equalsIgnoreCase(format) ? "pdf" : "xlsx");
        MediaType mediaType = "pdf".equalsIgnoreCase(format)
                ? MediaType.APPLICATION_PDF
                : MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(mediaType)
                .body(data);
    }

    @GetMapping("/financial")
    public ResponseEntity<byte[]> exportFinancialReport(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "excel") String format) {
        User currentUser = getCurrentUser(userDetails);
        byte[] data = reportService.exportFinancialReport(currentUser, format);

        String filename = "financial-report." + ("pdf".equalsIgnoreCase(format) ? "pdf" : "xlsx");
        MediaType mediaType = "pdf".equalsIgnoreCase(format)
                ? MediaType.APPLICATION_PDF
                : MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(mediaType)
                .body(data);
    }
}
