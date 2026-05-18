package com.eventhub.web.controller;

import com.eventhub.service.InvitationService;
import com.eventhub.web.dto.response.InvitationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/invitations")
@RequiredArgsConstructor
public class PublicInvitationController {

    private final InvitationService invitationService;

    @GetMapping("/{token}/accept")
    public ResponseEntity<InvitationResponse> acceptInvitation(@PathVariable String token) {
        return ResponseEntity.ok(invitationService.acceptInvitation(token));
    }
}
