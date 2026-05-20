package com.eventhub.service;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.Review;
import com.eventhub.domain.entity.User;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.ReviewRepository;
import com.eventhub.web.dto.request.ReviewRequest;
import com.eventhub.web.dto.response.ReviewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final EventRepository eventRepository;

    @Transactional
    public ReviewResponse createOrUpdateReview(User user, ReviewRequest request) {
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        Review review = reviewRepository.findByEventIdAndUserId(request.getEventId(), user.getId())
                .orElseGet(() -> Review.builder()
                        .event(event)
                        .user(user)
                        .build());

        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setIsPublic(true);

        Review savedReview = reviewRepository.save(review);
        return mapToResponse(savedReview);
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getAttendeeReviews(User user) {
        return reviewRepository.findByUserId(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getEventReviews(UUID eventId) {
        return reviewRepository.findByEventId(eventId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ReviewResponse mapToResponse(Review review) {
        String userName = review.getUser().getEmail();
        if (review.getUser().getAttendeeProfile() != null && review.getUser().getAttendeeProfile().getDisplayName() != null) {
            userName = review.getUser().getAttendeeProfile().getDisplayName();
        } else if (review.getUser().getOrganizerProfile() != null && review.getUser().getOrganizerProfile().getCompanyName() != null) {
            userName = review.getUser().getOrganizerProfile().getCompanyName();
        }

        return ReviewResponse.builder()
                .id(review.getId())
                .eventId(review.getEvent().getId())
                .eventTitle(review.getEvent().getTitle())
                .eventBannerUrl(review.getEvent().getBannerUrl())
                .userId(review.getUser().getId())
                .userName(userName)
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
