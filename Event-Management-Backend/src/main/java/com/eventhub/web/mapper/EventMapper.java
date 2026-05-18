package com.eventhub.web.mapper;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.EventSchedule;
import com.eventhub.domain.entity.EventTimeline;
import com.eventhub.domain.entity.TicketType;
import com.eventhub.web.dto.response.EventDetailResponse;
import com.eventhub.web.dto.response.EventScheduleResponse;
import com.eventhub.web.dto.response.EventSummaryResponse;
import com.eventhub.web.dto.response.EventTimelineResponse;
import com.eventhub.web.dto.response.TicketTypeResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventMapper {

    EventSummaryResponse toSummaryResponse(Event event);

    @Mapping(target = "organizer.id", source = "organizer.id")
    @Mapping(target = "organizer.email", source = "organizer.email")
    // We can map fullName similarly to UserMapper, but since MapStruct doesn't know about the User's profile easily, 
    // we can either add a custom method or just ignore fullName and fill it manually in the service if needed.
    // For now we map basic info.
    EventDetailResponse toDetailResponse(Event event);

    EventTimelineResponse toTimelineResponse(EventTimeline timeline);

    List<EventTimelineResponse> toTimelineResponseList(List<EventTimeline> timelines);

    EventScheduleResponse toScheduleResponse(EventSchedule schedule);

    List<EventScheduleResponse> toScheduleResponseList(List<EventSchedule> schedules);

    TicketTypeResponse toTicketTypeResponse(TicketType ticketType);
}
