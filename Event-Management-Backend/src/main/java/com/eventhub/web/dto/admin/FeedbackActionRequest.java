package com.eventhub.web.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackActionRequest {
    private UUID feedbackId;
    private String actionType; // APPROVE, WARN, HIDE, REPLY, TRANSFER_TECH
    private String replyText;
}
