package com.eventhub.service;

import com.eventhub.domain.entity.User;
import com.eventhub.domain.entity.Venue;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.VenueRepository;
import com.eventhub.web.dto.request.CreateVenueRequest;
import com.eventhub.web.dto.request.UpdateVenueRequest;
import com.eventhub.web.dto.response.VenueResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class VenueService {

    private final VenueRepository venueRepository;

    public VenueResponse createVenue(User organizer, CreateVenueRequest request) {
        Venue venue = Venue.builder()
                .organizer(organizer)
                .name(request.getName())
                .address(request.getAddress())
                .city(request.getCity())
                .capacity(request.getCapacity())
                .imageUrl(request.getImageUrl())
                .build();

        venue = venueRepository.save(venue);
        return toResponse(venue);
    }

    @Transactional(readOnly = true)
    public List<VenueResponse> getVenues(User organizer) {
        return venueRepository.findByOrganizerIdOrderByNameAsc(organizer.getId())
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public VenueResponse updateVenue(User organizer, UUID venueId, UpdateVenueRequest request) {
        Venue venue = venueRepository.findByIdAndOrganizerId(venueId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + venueId));

        if (request.getName() != null) venue.setName(request.getName());
        if (request.getAddress() != null) venue.setAddress(request.getAddress());
        if (request.getCity() != null) venue.setCity(request.getCity());
        if (request.getCapacity() != null) venue.setCapacity(request.getCapacity());
        if (request.getImageUrl() != null) venue.setImageUrl(request.getImageUrl());

        venue = venueRepository.save(venue);
        return toResponse(venue);
    }

    public void deleteVenue(User organizer, UUID venueId) {
        Venue venue = venueRepository.findByIdAndOrganizerId(venueId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + venueId));

        venueRepository.delete(venue);
    }

    private VenueResponse toResponse(Venue venue) {
        return VenueResponse.builder()
                .id(venue.getId())
                .name(venue.getName())
                .address(venue.getAddress())
                .city(venue.getCity())
                .capacity(venue.getCapacity())
                .imageUrl(venue.getImageUrl())
                .createdAt(venue.getCreatedAt())
                .updatedAt(venue.getUpdatedAt())
                .build();
    }
}
