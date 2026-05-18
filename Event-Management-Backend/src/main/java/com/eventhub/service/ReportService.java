package com.eventhub.service;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.Registration;
import com.eventhub.domain.entity.Transaction;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.entity.WithdrawalRequest;
import com.eventhub.domain.enums.RegistrationStatus;
import com.eventhub.domain.enums.TransactionStatus;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.RegistrationRepository;
import com.eventhub.repository.TransactionRepository;
import com.eventhub.repository.WithdrawalRequestRepository;
import com.eventhub.web.dto.response.FinanceOverviewResponse;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;
    private final TransactionRepository transactionRepository;
    private final WithdrawalRequestRepository withdrawalRequestRepository;
    private final FinanceService financeService;

    private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")
            .withZone(ZoneId.systemDefault());

    public byte[] exportReport(User organizer, String format) {
        List<Event> events = eventRepository.findByOrganizerIdOrderByCreatedAtDesc(organizer.getId());
        List<UUID> eventIds = events.stream().map(Event::getId).toList();
        List<Registration> registrations = registrationRepository.findByEventIdIn(eventIds);
        List<Transaction> transactions = transactionRepository.findByEventIdInOrderByCreatedAtDesc(eventIds);

        if ("pdf".equalsIgnoreCase(format)) {
            return buildEventReportPdf(organizer, events, registrations, transactions);
        }
        return buildEventReportExcel(organizer, events, registrations, transactions);
    }

    public byte[] exportFinancialReport(User organizer, String format) {
        var overview = financeService.getOverview(organizer);
        List<Event> events = eventRepository.findByOrganizerIdOrderByCreatedAtDesc(organizer.getId());
        List<UUID> eventIds = events.stream().map(Event::getId).toList();
        List<Transaction> transactions = transactionRepository.findByEventIdInOrderByCreatedAtDesc(eventIds);
        List<WithdrawalRequest> withdrawals = withdrawalRequestRepository
                .findByOrganizerIdOrderByCreatedAtDesc(organizer.getId());

        if ("pdf".equalsIgnoreCase(format)) {
            return buildFinancialReportPdf(organizer, overview, transactions, withdrawals);
        }
        return buildFinancialReportExcel(organizer, overview, transactions, withdrawals);
    }

    // ======================== EXCEL ========================

    private byte[] buildEventReportExcel(User organizer, List<Event> events,
                                          List<Registration> registrations,
                                          List<Transaction> transactions) {
        try (Workbook wb = new XSSFWorkbook()) {
            CellStyle headerStyle = wb.createCellStyle();
            org.apache.poi.ss.usermodel.Font headerFont = wb.createFont();
            headerFont.setBold(true);
            headerFont.setFontHeightInPoints((short) 12);
            headerStyle.setFont(headerFont);

            Sheet eventSheet = wb.createSheet("Events");
            writeEventExcelHeader(eventSheet, headerStyle);
            int rowIdx = 1;
            for (Event e : events) {
                Row row = eventSheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(e.getTitle());
                row.createCell(1).setCellValue(e.getStatus().name());
                row.createCell(2).setCellValue(DTF.format(e.getStartDate()));
                row.createCell(3).setCellValue(e.getCity());
                row.createCell(4).setCellValue(e.getMaxAttendees() != null ? e.getMaxAttendees() : 0);
            }
            for (int i = 0; i < 5; i++) eventSheet.autoSizeColumn(i);

            Sheet regSheet = wb.createSheet("Registrations");
            writeRegExcelHeader(regSheet, headerStyle);
            rowIdx = 1;
            for (Registration r : registrations.stream()
                    .filter(r -> r.getStatus() == RegistrationStatus.CONFIRMED).toList()) {
                Row row = regSheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(r.getEvent().getTitle());
                row.createCell(1).setCellValue(r.getAttendee().getEmail());
                row.createCell(2).setCellValue(r.getStatus().name());
                row.createCell(3).setCellValue(r.getFinalAmount().doubleValue());
                row.createCell(4).setCellValue(DTF.format(r.getCreatedAt()));
            }
            for (int i = 0; i < 5; i++) regSheet.autoSizeColumn(i);

            Sheet txnSheet = wb.createSheet("Transactions");
            writeTxnExcelHeader(txnSheet, headerStyle);
            rowIdx = 1;
            for (Transaction t : transactions) {
                Row row = txnSheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(t.getType().name());
                row.createCell(1).setCellValue(t.getAmount().doubleValue());
                row.createCell(2).setCellValue(t.getFee().doubleValue());
                row.createCell(3).setCellValue(t.getStatus().name());
                row.createCell(4).setCellValue(t.getPaymentMethod() != null ? t.getPaymentMethod() : "");
                row.createCell(5).setCellValue(DTF.format(t.getCreatedAt()));
            }
            for (int i = 0; i < 6; i++) txnSheet.autoSizeColumn(i);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            wb.write(out);
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate Excel report", e);
        }
    }

    private void writeEventExcelHeader(Sheet sheet, CellStyle style) {
        Row row = sheet.createRow(0);
        String[] cols = {"Title", "Status", "Start Date", "City", "Max Attendees"};
        for (int i = 0; i < cols.length; i++) {
            Cell c = row.createCell(i);
            c.setCellValue(cols[i]);
            c.setCellStyle(style);
        }
    }

    private void writeRegExcelHeader(Sheet sheet, CellStyle style) {
        Row row = sheet.createRow(0);
        String[] cols = {"Event", "Attendee", "Status", "Amount", "Date"};
        for (int i = 0; i < cols.length; i++) {
            Cell c = row.createCell(i);
            c.setCellValue(cols[i]);
            c.setCellStyle(style);
        }
    }

    private void writeTxnExcelHeader(Sheet sheet, CellStyle style) {
        Row row = sheet.createRow(0);
        String[] cols = {"Type", "Amount", "Fee", "Status", "Payment Method", "Date"};
        for (int i = 0; i < cols.length; i++) {
            Cell c = row.createCell(i);
            c.setCellValue(cols[i]);
            c.setCellStyle(style);
        }
    }

    private byte[] buildFinancialReportExcel(User organizer, FinanceOverviewResponse overview,
                                              List<Transaction> transactions,
                                              List<WithdrawalRequest> withdrawals) {
        try (Workbook wb = new XSSFWorkbook()) {
            CellStyle headerStyle = wb.createCellStyle();
            org.apache.poi.ss.usermodel.Font headerFont = wb.createFont();
            headerFont.setBold(true);
            headerFont.setFontHeightInPoints((short) 12);
            headerStyle.setFont(headerFont);

            Sheet summarySheet = wb.createSheet("Overview");
            summarySheet.createRow(0).createCell(0).setCellValue("Metric");
            summarySheet.getRow(0).createCell(1).setCellValue("Value");
            summarySheet.getRow(0).getCell(0).setCellStyle(headerStyle);
            summarySheet.getRow(0).getCell(1).setCellStyle(headerStyle);

            writeSummaryRow(summarySheet, 1, "Total Revenue", overview.getTotalRevenue());
            writeSummaryRow(summarySheet, 2, "Platform Fee", overview.getPlatformFee());
            writeSummaryRow(summarySheet, 3, "Refund", overview.getRefund());
            writeSummaryRow(summarySheet, 4, "Net Revenue", overview.getNetRevenue());
            summarySheet.autoSizeColumn(0);
            summarySheet.autoSizeColumn(1);

            Sheet txnSheet = wb.createSheet("Transactions");
            writeTxnExcelHeader(txnSheet, headerStyle);
            int rowIdx = 1;
            for (Transaction t : transactions) {
                Row row = txnSheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(t.getType().name());
                row.createCell(1).setCellValue(t.getAmount().doubleValue());
                row.createCell(2).setCellValue(t.getFee().doubleValue());
                row.createCell(3).setCellValue(t.getStatus().name());
                row.createCell(4).setCellValue(t.getPaymentMethod() != null ? t.getPaymentMethod() : "");
                row.createCell(5).setCellValue(DTF.format(t.getCreatedAt()));
            }
            for (int i = 0; i < 6; i++) txnSheet.autoSizeColumn(i);

            Sheet wdSheet = wb.createSheet("Withdrawals");
            Row wdHeader = wdSheet.createRow(0);
            String[] wdCols = {"Amount", "Bank", "Account", "Status", "Date"};
            for (int i = 0; i < wdCols.length; i++) {
                Cell c = wdHeader.createCell(i);
                c.setCellValue(wdCols[i]);
                c.setCellStyle(headerStyle);
            }
            rowIdx = 1;
            for (WithdrawalRequest w : withdrawals) {
                Row row = wdSheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(w.getAmount().doubleValue());
                row.createCell(1).setCellValue(w.getBankName());
                row.createCell(2).setCellValue(w.getBankAccount());
                row.createCell(3).setCellValue(w.getStatus().name());
                row.createCell(4).setCellValue(DTF.format(w.getCreatedAt()));
            }
            for (int i = 0; i < 5; i++) wdSheet.autoSizeColumn(i);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            wb.write(out);
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate financial Excel report", e);
        }
    }

    private void writeSummaryRow(Sheet sheet, int rowIdx, String label, BigDecimal value) {
        Row row = sheet.createRow(rowIdx);
        row.createCell(0).setCellValue(label);
        row.createCell(1).setCellValue(value.doubleValue());
    }

    // ======================== PDF ========================

    private byte[] buildEventReportPdf(User organizer, List<Event> events,
                                        List<Registration> registrations,
                                        List<Transaction> transactions) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document doc = new Document(PageSize.A4.rotate());
            PdfWriter.getInstance(doc, out);
            doc.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
            Font cellFont = FontFactory.getFont(FontFactory.HELVETICA, 9);

            doc.add(new Paragraph("Event Report - " + organizer.getEmail(), titleFont));
            doc.add(new Paragraph("Generated: " + DTF.format(Instant.now()), cellFont));
            doc.add(new Paragraph(" "));

            doc.add(new Paragraph("Events", headerFont));
            PdfPTable eventTable = new PdfPTable(5);
            eventTable.setWidthPercentage(100);
            addTableHeader(eventTable, new String[]{"Title", "Status", "Start Date", "City", "Max Attendees"}, headerFont);
            for (Event e : events) {
                eventTable.addCell(new Phrase(e.getTitle(), cellFont));
                eventTable.addCell(new Phrase(e.getStatus().name(), cellFont));
                eventTable.addCell(new Phrase(DTF.format(e.getStartDate()), cellFont));
                eventTable.addCell(new Phrase(e.getCity(), cellFont));
                eventTable.addCell(new Phrase(String.valueOf(e.getMaxAttendees() != null ? e.getMaxAttendees() : 0), cellFont));
            }
            doc.add(eventTable);
            doc.add(new Paragraph(" "));

            doc.add(new Paragraph("Registrations", headerFont));
            PdfPTable regTable = new PdfPTable(5);
            regTable.setWidthPercentage(100);
            addTableHeader(regTable, new String[]{"Event", "Attendee", "Status", "Amount", "Date"}, headerFont);
            for (Registration r : registrations.stream()
                    .filter(r -> r.getStatus() == RegistrationStatus.CONFIRMED).toList()) {
                regTable.addCell(new Phrase(r.getEvent().getTitle(), cellFont));
                regTable.addCell(new Phrase(r.getAttendee().getEmail(), cellFont));
                regTable.addCell(new Phrase(r.getStatus().name(), cellFont));
                regTable.addCell(new Phrase(r.getFinalAmount().toString(), cellFont));
                regTable.addCell(new Phrase(DTF.format(r.getCreatedAt()), cellFont));
            }
            doc.add(regTable);
            doc.add(new Paragraph(" "));

            doc.add(new Paragraph("Transactions", headerFont));
            PdfPTable txnTable = new PdfPTable(6);
            txnTable.setWidthPercentage(100);
            addTableHeader(txnTable, new String[]{"Type", "Amount", "Fee", "Status", "Method", "Date"}, headerFont);
            for (Transaction t : transactions) {
                txnTable.addCell(new Phrase(t.getType().name(), cellFont));
                txnTable.addCell(new Phrase(t.getAmount().toString(), cellFont));
                txnTable.addCell(new Phrase(t.getFee().toString(), cellFont));
                txnTable.addCell(new Phrase(t.getStatus().name(), cellFont));
                txnTable.addCell(new Phrase(t.getPaymentMethod() != null ? t.getPaymentMethod() : "", cellFont));
                txnTable.addCell(new Phrase(DTF.format(t.getCreatedAt()), cellFont));
            }
            doc.add(txnTable);

            doc.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF report", e);
        }
    }

    private byte[] buildFinancialReportPdf(User organizer, FinanceOverviewResponse overview,
                                            List<Transaction> transactions,
                                            List<WithdrawalRequest> withdrawals) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document doc = new Document(PageSize.A4);
            PdfWriter.getInstance(doc, out);
            doc.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
            Font cellFont = FontFactory.getFont(FontFactory.HELVETICA, 9);

            doc.add(new Paragraph("Financial Report - " + organizer.getEmail(), titleFont));
            doc.add(new Paragraph("Generated: " + DTF.format(Instant.now()), cellFont));
            doc.add(new Paragraph(" "));

            doc.add(new Paragraph("Overview", headerFont));
            PdfPTable summaryTable = new PdfPTable(2);
            summaryTable.setWidthPercentage(50);
            addTableHeader(summaryTable, new String[]{"Metric", "Value"}, headerFont);
            summaryTable.addCell(new Phrase("Total Revenue", cellFont));
            summaryTable.addCell(new Phrase(overview.getTotalRevenue().toString(), cellFont));
            summaryTable.addCell(new Phrase("Platform Fee", cellFont));
            summaryTable.addCell(new Phrase(overview.getPlatformFee().toString(), cellFont));
            summaryTable.addCell(new Phrase("Refund", cellFont));
            summaryTable.addCell(new Phrase(overview.getRefund().toString(), cellFont));
            summaryTable.addCell(new Phrase("Net Revenue", cellFont));
            summaryTable.addCell(new Phrase(overview.getNetRevenue().toString(), cellFont));
            doc.add(summaryTable);
            doc.add(new Paragraph(" "));

            doc.add(new Paragraph("Transactions", headerFont));
            PdfPTable txnTable = new PdfPTable(6);
            txnTable.setWidthPercentage(100);
            addTableHeader(txnTable, new String[]{"Type", "Amount", "Fee", "Status", "Method", "Date"}, headerFont);
            for (Transaction t : transactions) {
                txnTable.addCell(new Phrase(t.getType().name(), cellFont));
                txnTable.addCell(new Phrase(t.getAmount().toString(), cellFont));
                txnTable.addCell(new Phrase(t.getFee().toString(), cellFont));
                txnTable.addCell(new Phrase(t.getStatus().name(), cellFont));
                txnTable.addCell(new Phrase(t.getPaymentMethod() != null ? t.getPaymentMethod() : "", cellFont));
                txnTable.addCell(new Phrase(DTF.format(t.getCreatedAt()), cellFont));
            }
            doc.add(txnTable);
            doc.add(new Paragraph(" "));

            doc.add(new Paragraph("Withdrawals", headerFont));
            PdfPTable wdTable = new PdfPTable(5);
            wdTable.setWidthPercentage(100);
            addTableHeader(wdTable, new String[]{"Amount", "Bank", "Account", "Status", "Date"}, headerFont);
            for (WithdrawalRequest w : withdrawals) {
                wdTable.addCell(new Phrase(w.getAmount().toString(), cellFont));
                wdTable.addCell(new Phrase(w.getBankName(), cellFont));
                wdTable.addCell(new Phrase(w.getBankAccount(), cellFont));
                wdTable.addCell(new Phrase(w.getStatus().name(), cellFont));
                wdTable.addCell(new Phrase(DTF.format(w.getCreatedAt()), cellFont));
            }
            doc.add(wdTable);

            doc.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate financial PDF report", e);
        }
    }

    private void addTableHeader(PdfPTable table, String[] headers, Font font) {
        for (String h : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(h, font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
        }
    }
}
