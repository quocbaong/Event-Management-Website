package com.eventhub.web.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BroadcastHistoryDTO {
    private String type;
    private String title;
    private String sentAt;
    private String viewRate;
    private long reach;
    private long clicks;
    private String bounce;
    private String body;
}

