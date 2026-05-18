package com.eventhub.service.impl;

import com.eventhub.service.AdminService;
import com.eventhub.web.dto.admin.DashboardResponse;
import com.eventhub.web.dto.admin.EventCategoryDTO;
import com.eventhub.web.dto.admin.RevenueChartDTO;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final EntityManager entityManager;

    @Override
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
}
