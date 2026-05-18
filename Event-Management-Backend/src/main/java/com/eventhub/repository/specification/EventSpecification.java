package com.eventhub.repository.specification;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.enums.EventStatus;
import com.eventhub.web.dto.request.EventFilterRequest;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class EventSpecification {

    public static Specification<Event> filterPublicEvents(EventFilterRequest filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Only published events for public APIs
            predicates.add(cb.equal(root.get("status"), EventStatus.PUBLISHED));

            if (filter != null) {
                if (StringUtils.hasText(filter.getSearch())) {
                    String searchPattern = "%" + filter.getSearch().toLowerCase() + "%";
                    Predicate titlePredicate = cb.like(cb.lower(root.get("title")), searchPattern);
                    Predicate venuePredicate = cb.like(cb.lower(root.get("venue")), searchPattern);
                    Predicate cityPredicate = cb.like(cb.lower(root.get("city")), searchPattern);
                    
                    predicates.add(cb.or(titlePredicate, venuePredicate, cityPredicate));
                }

                if (filter.getCategory() != null) {
                    predicates.add(cb.equal(root.get("category"), filter.getCategory()));
                }

                if (StringUtils.hasText(filter.getCity())) {
                    predicates.add(cb.equal(root.get("city"), filter.getCity()));
                }

                if (filter.getStartDateFrom() != null) {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("startDate"), filter.getStartDateFrom()));
                }

                if (filter.getStartDateTo() != null) {
                    predicates.add(cb.lessThanOrEqualTo(root.get("startDate"), filter.getStartDateTo()));
                }

                if (filter.getIsFeatured() != null) {
                    predicates.add(cb.equal(root.get("isFeatured"), filter.getIsFeatured()));
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
