package com.eventhub.service.impl;

import com.eventhub.service.AdminService;
import com.eventhub.web.dto.admin.DashboardResponse;
import com.eventhub.web.dto.admin.EventCategoryDTO;
import com.eventhub.web.dto.admin.RevenueChartDTO;
import com.eventhub.web.dto.admin.GlobalEventsResponse;
import com.eventhub.web.dto.admin.GlobalEventDTO;
import com.eventhub.web.dto.admin.AdminEventStatsDTO;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public DashboardResponse getDashboardStats(Integer month, Integer year) {
        Integer filterYear = year != null ? year : java.time.LocalDate.now().getYear();
        
        String timeCondition = " AND EXTRACT(YEAR FROM created_at) = " + filterYear;
        if (month != null) {
            timeCondition += " AND EXTRACT(MONTH FROM created_at) = " + month;
        }

        BigDecimal totalRev = (BigDecimal) entityManager.createNativeQuery(
                "SELECT SUM(amount) FROM transactions WHERE type = 'TICKET_SALE' AND status = 'SUCCESS'" + timeCondition)
                .getSingleResult();
        Double totalRevenue = totalRev != null ? totalRev.doubleValue() : 0.0;

        Long totalEvts = ((Number) entityManager.createNativeQuery("SELECT COUNT(*) FROM events WHERE 1=1" + timeCondition).getSingleResult()).longValue();
        Integer totalEvents = totalEvts != null ? totalEvts.intValue() : 0;

        Long totalAtt = ((Number) entityManager.createNativeQuery(
                "SELECT COUNT(*) FROM users WHERE role = 'ATTENDEE'" + timeCondition).getSingleResult()).longValue();
        Integer totalAttendees = totalAtt != null ? totalAtt.intValue() : 0;

        List<Object[]> monthlyStats = entityManager.createNativeQuery(
                "SELECT EXTRACT(MONTH FROM created_at) as month, SUM(amount) as rev " +
                "FROM transactions " +
                "WHERE type = 'TICKET_SALE' AND status = 'SUCCESS' AND EXTRACT(YEAR FROM created_at) = " + filterYear + " " +
                "GROUP BY EXTRACT(MONTH FROM created_at) " +
                "ORDER BY month")
                .getResultList();

        List<RevenueChartDTO> monthlyRevenue = new ArrayList<>();
        for (Object[] stat : monthlyStats) {
            String monthName = "Th." + ((Number) stat[0]).intValue();
            Double rev = stat[1] != null ? ((Number) stat[1]).doubleValue() : 0.0;
            monthlyRevenue.add(new RevenueChartDTO(monthName, rev));
        }

        List<Object[]> categoryStats = entityManager.createNativeQuery(
                "SELECT category, COUNT(*) FROM events WHERE 1=1" + timeCondition + " GROUP BY category")
                .getResultList();

        List<EventCategoryDTO> eventCategories = new ArrayList<>();
        for (Object[] stat : categoryStats) {
            String catName = stat[0].toString();
            Long count = ((Number) stat[1]).longValue();
            Integer percent = totalEvents > 0 ? (int) Math.round((count * 100.0) / totalEvents) : 0;
            eventCategories.add(new EventCategoryDTO(catName, percent));
        }

        return DashboardResponse.builder()
                .totalRevenue(totalRevenue)
                .totalEvents(totalEvents)
                .totalAttendees(totalAttendees)
                .satisfactionRate(4.8) // Mock for now as Review entity does not exist yet
                .monthlyRevenue(monthlyRevenue)
                .eventCategories(eventCategories)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] exportDashboardReport(Integer month, Integer year) {
        DashboardResponse stats = getDashboardStats(month, year);
        
        StringBuilder csvBuilder = new StringBuilder();
        // BOM for UTF-8 Excel support
        csvBuilder.append('\ufeff');
        csvBuilder.append("BÁO CÁO TỔNG QUAN HỆ THỐNG\n\n");
        csvBuilder.append("Thời gian:,").append(month != null ? "Tháng " + month + "/" : "Năm ").append(year != null ? year : java.time.LocalDate.now().getYear()).append("\n\n");
        
        csvBuilder.append("CHỈ SỐ CHÍNH\n");
        csvBuilder.append("Tổng doanh thu (VND),").append(String.format("%.0f", stats.getTotalRevenue())).append("\n");
        csvBuilder.append("Số sự kiện,").append(stats.getTotalEvents()).append("\n");
        csvBuilder.append("Số người tham dự,").append(stats.getTotalAttendees()).append("\n");
        csvBuilder.append("Độ hài lòng,").append(stats.getSatisfactionRate()).append("/5\n\n");
        
        csvBuilder.append("DOANH THU THEO THÁNG\n");
        csvBuilder.append("Tháng,Doanh thu (VND)\n");
        for (RevenueChartDTO rev : stats.getMonthlyRevenue()) {
            csvBuilder.append(rev.getMonth()).append(",").append(String.format("%.0f", rev.getRevenue())).append("\n");
        }
        
        csvBuilder.append("\nPHÂN LOẠI SỰ KIỆN\n");
        csvBuilder.append("Thể loại,Tỷ lệ (%)\n");
        for (EventCategoryDTO cat : stats.getEventCategories()) {
            csvBuilder.append(cat.getName()).append(",").append(cat.getPercent()).append("%\n");
        }
        
        return csvBuilder.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8);
    }

    @Override
    @Transactional(readOnly = true)
    public GlobalEventsResponse getGlobalEvents(String search, String category, String organizerRole, String status, int page, int size) {
        Long totalEvts = ((Number) entityManager.createNativeQuery("SELECT COUNT(*) FROM events").getSingleResult()).longValue();
        Long ongoingEvts = ((Number) entityManager.createNativeQuery("SELECT COUNT(*) FROM events WHERE status = 'PUBLISHED' OR status = 'ONGOING'").getSingleResult()).longValue();
        Long pendingEvts = ((Number) entityManager.createNativeQuery("SELECT COUNT(*) FROM events WHERE status = 'DRAFT'").getSingleResult()).longValue();
        Long reportedEvts = ((Number) entityManager.createNativeQuery("SELECT COUNT(*) FROM events WHERE status = 'CANCELLED'").getSingleResult()).longValue();

        AdminEventStatsDTO statsDTO = AdminEventStatsDTO.builder()
                .totalEvents(totalEvts)
                .totalEventsTrend("+12%")
                .ongoingEvents(ongoingEvts)
                .pendingEvents(pendingEvts)
                .reportedEvents(reportedEvts)
                .build();

        List<Object[]> categoryStats = entityManager.createNativeQuery(
                "SELECT category, COUNT(*) FROM events GROUP BY category")
                .getResultList();
        
        List<EventCategoryDTO> categories = new ArrayList<>();
        long totalForCategories = 0;
        
        long hoithao = 0, amnhac = 0, thethao = 0, khac = 0;
        
        for (Object[] stat : categoryStats) {
            String cat = stat[0].toString();
            long count = ((Number) stat[1]).longValue();
            totalForCategories += count;
            
            if (cat.equals("TECH") || cat.equals("BUSINESS") || cat.equals("EDUCATION")) {
                hoithao += count;
            } else if (cat.equals("MUSIC")) {
                amnhac += count;
            } else if (cat.equals("SPORTS")) {
                thethao += count;
            } else {
                khac += count;
            }
        }
        
        if (totalForCategories > 0) {
            categories.add(new EventCategoryDTO("HỘI THẢO", (int) Math.round((hoithao * 100.0) / totalForCategories)));
            categories.add(new EventCategoryDTO("ÂM NHẠC", (int) Math.round((amnhac * 100.0) / totalForCategories)));
            categories.add(new EventCategoryDTO("THỂ THAO", (int) Math.round((thethao * 100.0) / totalForCategories)));
            categories.add(new EventCategoryDTO("KHÁC", (int) Math.round((khac * 100.0) / totalForCategories)));
        } else {
            categories.add(new EventCategoryDTO("HỘI THẢO", 0));
            categories.add(new EventCategoryDTO("ÂM NHẠC", 0));
            categories.add(new EventCategoryDTO("THỂ THAO", 0));
            categories.add(new EventCategoryDTO("KHÁC", 0));
        }

        StringBuilder sql = new StringBuilder(
            "SELECT e.id, e.title, e.thumbnail_url, u.email, op.company_name, op.is_verified, op.total_revenue, op.logo_url, e.status, e.current_attendees, e.max_attendees, e.start_date " +
            "FROM events e " +
            "JOIN users u ON e.organizer_id = u.id " +
            "LEFT JOIN organizer_profiles op ON u.id = op.user_id " +
            "WHERE 1=1"
        );

        List<String> conditions = new ArrayList<>();
        if (search != null && !search.trim().isEmpty()) {
            conditions.add("(e.title ILIKE '%" + search.trim() + "%' OR e.description ILIKE '%" + search.trim() + "%' OR e.id::text ILIKE '%" + search.trim() + "%')");
        }
        if (category != null && !category.trim().isEmpty() && !category.equals("Tất cả hạng mục")) {
            String dbCat = null;
            if (category.equals("HỘI THẢO")) dbCat = "TECH";
            else if (category.equals("ÂM NHẠC")) dbCat = "MUSIC";
            else if (category.equals("THỂ THAO")) dbCat = "SPORTS";
            else if (category.equals("KHÁC")) dbCat = "OTHER";
            
            if (dbCat != null) {
                conditions.add("e.category = '" + dbCat + "'");
            } else {
                conditions.add("e.category = '" + category + "'");
            }
        }
        if (organizerRole != null && !organizerRole.trim().isEmpty() && !organizerRole.equals("Tất cả cấp độ")) {
            if (organizerRole.equalsIgnoreCase("Platinum")) {
                conditions.add("op.is_verified = true AND op.total_revenue >= 10000000");
            } else if (organizerRole.equalsIgnoreCase("Verified")) {
                conditions.add("op.is_verified = true AND (op.total_revenue IS NULL OR op.total_revenue < 10000000)");
            } else if (organizerRole.equalsIgnoreCase("Standard")) {
                conditions.add("(op.is_verified = false OR op.is_verified IS NULL)");
            }
        }
        if (status != null && !status.trim().isEmpty() && !status.equals("Tất cả trạng thái")) {
            if (status.equals("Đang diễn ra")) {
                conditions.add("(e.status = 'PUBLISHED' OR e.status = 'ONGOING')");
            } else if (status.equals("Chờ phê duyệt")) {
                conditions.add("e.status = 'DRAFT'");
            } else if (status.equals("Bị đình chỉ")) {
                conditions.add("e.status = 'CANCELLED'");
            }
        }

        for (String cond : conditions) {
            sql.append(" AND ").append(cond);
        }

        sql.append(" ORDER BY e.created_at DESC");

        String countSql = "SELECT COUNT(*) FROM (" + sql.toString() + ") AS temp_count";
        long totalItems = ((Number) entityManager.createNativeQuery(countSql).getSingleResult()).longValue();

        int offset = (page - 1) * size;
        sql.append(" LIMIT ").append(size).append(" OFFSET ").append(offset);

        List<Object[]> rows = entityManager.createNativeQuery(sql.toString()).getResultList();
        List<GlobalEventDTO> events = new ArrayList<>();

        java.time.format.DateTimeFormatter dateFormatter = java.time.format.DateTimeFormatter.ofPattern("dd 'Th'M, yyyy");
        java.time.format.DateTimeFormatter timeFormatter = java.time.format.DateTimeFormatter.ofPattern("hh:mm a");

        for (Object[] r : rows) {
            UUID dbId = (UUID) r[0];
            String title = r[1] != null ? r[1].toString() : "";
            String thumb = r[2] != null ? r[2].toString() : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100";
            String email = r[3] != null ? r[3].toString() : "";
            String company = r[4] != null ? r[4].toString() : "";
            Boolean isVerified = r[5] != null ? (Boolean) r[5] : false;
            BigDecimal totalRev = r[6] != null ? (BigDecimal) r[6] : BigDecimal.ZERO;
            String logo = r[7] != null ? r[7].toString() : "https://avatar.vercel.sh/" + dbId.toString().substring(0,8);
            String evtStatus = r[8] != null ? r[8].toString() : "DRAFT";
            Integer currentAtt = r[9] != null ? ((Number) r[9]).intValue() : 0;
            Integer maxAtt = r[10] != null ? ((Number) r[10]).intValue() : 0;
            
            java.time.OffsetDateTime odt = null;
            if (r[11] != null) {
                if (r[11] instanceof java.sql.Timestamp) {
                    odt = java.time.OffsetDateTime.ofInstant(((java.sql.Timestamp) r[11]).toInstant(), java.time.ZoneId.systemDefault());
                } else if (r[11] instanceof java.time.OffsetDateTime) {
                    odt = (java.time.OffsetDateTime) r[11];
                }
            }
            
            String formattedDate = odt != null ? odt.format(dateFormatter) : "N/A";
            String formattedTime = odt != null ? odt.format(timeFormatter) : "N/A";

            String role = "Standard";
            if (isVerified) {
                if (totalRev.doubleValue() >= 10000000) {
                    role = "Platinum";
                } else {
                    role = "Verified";
                }
            }

            String statusText = "Chờ phê duyệt";
            String statusColor = "bg-orange-100 text-orange-700 dot-orange";
            if (evtStatus.equals("PUBLISHED") || evtStatus.equals("ONGOING") || evtStatus.equals("ON_SALE") || evtStatus.equals("SOLD_OUT") || evtStatus.equals("COMPLETED")) {
                statusText = "Đang diễn ra";
                statusColor = "bg-green-100 text-green-700 dot-green";
            } else if (evtStatus.equals("CANCELLED")) {
                statusText = "Bị đình chỉ";
                statusColor = "bg-red-100 text-red-700 dot-red";
            }

            int percent = maxAtt > 0 ? (int) Math.round((currentAtt * 100.0) / maxAtt) : 0;
            String eventId = "EVT-" + dbId.toString().substring(0, 8).toUpperCase();

            events.add(GlobalEventDTO.builder()
                    .id(eventId)
                    .dbId(dbId)
                    .name(title)
                    .image(thumb)
                    .organizer(GlobalEventDTO.OrganizerDTO.builder()
                            .name(company.isEmpty() ? email : company)
                            .role(role)
                            .avatar(logo)
                            .build())
                    .status(GlobalEventDTO.StatusDTO.builder()
                            .text(statusText)
                            .color(statusColor)
                            .build())
                    .joined(GlobalEventDTO.JoinedDTO.builder()
                            .current(currentAtt >= 1000 ? String.format("%.1fk", currentAtt / 1000.0) : String.valueOf(currentAtt))
                            .total(maxAtt >= 1000 ? String.format("%.0fk", maxAtt / 1000.0) : String.valueOf(maxAtt))
                            .percent(percent)
                            .build())
                    .date(formattedDate)
                    .time(formattedTime)
                    .build());
        }

        int totalPages = (int) Math.ceil((double) totalItems / size);

        return GlobalEventsResponse.builder()
                .stats(statsDTO)
                .events(events)
                .categories(categories)
                .pagination(GlobalEventsResponse.PaginationDTO.builder()
                        .currentPage(page)
                        .totalPages(totalPages > 0 ? totalPages : 1)
                        .totalItems(totalItems)
                        .pageSize(size)
                        .build())
                .build();
    }

    @Override
    @Transactional
    public void approveEvent(UUID id) {
        entityManager.createNativeQuery("UPDATE events SET status = 'PUBLISHED' WHERE id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    @Override
    @Transactional
    public void suspendEvent(UUID id) {
        entityManager.createNativeQuery("UPDATE events SET status = 'CANCELLED' WHERE id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    @Override
    @Transactional
    public void bulkApprove(List<UUID> ids) {
        if (ids != null && !ids.isEmpty()) {
            entityManager.createNativeQuery("UPDATE events SET status = 'PUBLISHED' WHERE id IN (:ids)")
                    .setParameter("ids", ids)
                    .executeUpdate();
        }
    }

    @Override
    @Transactional
    public void bulkSuspend(List<UUID> ids) {
        if (ids != null && !ids.isEmpty()) {
            entityManager.createNativeQuery("UPDATE events SET status = 'CANCELLED' WHERE id IN (:ids)")
                    .setParameter("ids", ids)
                    .executeUpdate();
        }
    }
}

