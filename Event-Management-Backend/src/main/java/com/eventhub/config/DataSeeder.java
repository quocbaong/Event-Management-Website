package com.eventhub.config;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.QrCode;
import com.eventhub.domain.entity.Registration;
import com.eventhub.domain.entity.Ticket;
import com.eventhub.domain.entity.TicketType;
import com.eventhub.domain.entity.Transaction;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.entity.Venue;
import com.eventhub.domain.entity.EventTemplate;
import com.eventhub.domain.entity.Invitation;
import com.eventhub.domain.entity.EventSchedule;
import com.eventhub.domain.entity.EventTimeline;
import com.eventhub.domain.entity.WithdrawalRequest;
import com.eventhub.domain.enums.EventCategory;
import com.eventhub.domain.enums.EventStatus;
import com.eventhub.domain.enums.InviteStatus;
import com.eventhub.domain.enums.RegistrationStatus;
import com.eventhub.domain.enums.TicketStatus;
import com.eventhub.domain.enums.TransactionStatus;
import com.eventhub.domain.enums.TransactionType;
import com.eventhub.domain.enums.UserRole;
import com.eventhub.domain.enums.WithdrawalStatus;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.EventTemplateRepository;
import com.eventhub.repository.InvitationRepository;
import com.eventhub.repository.QrCodeRepository;
import com.eventhub.repository.RegistrationRepository;
import com.eventhub.repository.TicketRepository;
import com.eventhub.repository.TicketTypeRepository;
import com.eventhub.repository.EventScheduleRepository;
import com.eventhub.repository.EventTimelineRepository;
import com.eventhub.repository.TransactionRepository;
import com.eventhub.repository.UserRepository;
import com.eventhub.repository.VenueRepository;
import com.eventhub.repository.WithdrawalRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final EventScheduleRepository scheduleRepository;
    private final EventTimelineRepository timelineRepository;
    private final VenueRepository venueRepository;
    private final RegistrationRepository registrationRepository;
    private final TicketRepository ticketRepository;
    private final QrCodeRepository qrCodeRepository;
    private final TransactionRepository transactionRepository;
    private final WithdrawalRequestRepository withdrawalRequestRepository;
    private final InvitationRepository invitationRepository;
    private final EventTemplateRepository eventTemplateRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 2) {
            log.info("Data already seeded, skipping.");
            return;
        }

        log.info("Seeding sample data...");

        User organizer = userRepository.findByEmail("organizer@test.com").orElseGet(() ->
                userRepository.save(User.builder()
                        .email("organizer@test.com")
                        .passwordHash(passwordEncoder.encode("test123"))
                        .role(UserRole.ORGANIZER)
                        .isVerified(true)
                        .isActive(true)
                        .build()));

        User attendee = userRepository.findByEmail("attendee@test.com").orElseGet(() ->
                userRepository.save(User.builder()
                        .email("attendee@test.com")
                        .passwordHash(passwordEncoder.encode("test123"))
                        .role(UserRole.ATTENDEE)
                        .isVerified(true)
                        .isActive(true)
                        .build()));

        User user2 = userRepository.save(User.builder()
                .email("user2@test.com")
                .passwordHash(passwordEncoder.encode("test123"))
                .role(UserRole.ATTENDEE)
                .isVerified(true)
                .isActive(true)
                .build());

        Venue venue1 = venueRepository.save(Venue.builder()
                .organizer(organizer)
                .name("Nhà hát Lớn Hà Nội")
                .address("Số 1 Tràng Tiền")
                .city("Hà Nội")
                .capacity(800)
                .imageUrl("https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400")
                .build());

        Venue venue2 = venueRepository.save(Venue.builder()
                .organizer(organizer)
                .name("SECC - Trung tâm Hội chợ Triển lãm")
                .address("799 Nguyễn Văn Linh, Quận 7")
                .city("Hồ Chí Minh")
                .capacity(3000)
                .imageUrl("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400")
                .build());

        Event event1 = eventRepository.save(Event.builder()
                .organizer(organizer)
                .title("Tech Summit 2026")
                .slug("tech-summit-2026")
                .description("Hội nghị công nghệ lớn nhất năm 2026 với sự tham gia của các diễn giả hàng đầu.")
                .shortDesc("Hội nghị công nghệ số 1 Việt Nam")
                .category(EventCategory.TECH)
                .status(EventStatus.PUBLISHED)
                .venue(venue1.getName())
                .address(venue1.getAddress())
                .city(venue1.getCity())
                .startDate(Instant.now().plus(30, ChronoUnit.DAYS))
                .endDate(Instant.now().plus(31, ChronoUnit.DAYS))
                .registrationDeadline(Instant.now().plus(28, ChronoUnit.DAYS))
                .maxAttendees(500)
                .build());

        Event event2 = eventRepository.save(Event.builder()
                .organizer(organizer)
                .title("Summer Music Festival 2026")
                .slug("summer-music-festival-2026")
                .description("Lễ hội âm nhạc mùa hè với nhiều nghệ sĩ nổi tiếng.")
                .shortDesc("Lễ hội âm nhạc lớn nhất hè")
                .category(EventCategory.MUSIC)
                .status(EventStatus.PUBLISHED)
                .venue(venue2.getName())
                .address(venue2.getAddress())
                .city(venue2.getCity())
                .startDate(Instant.now().plus(60, ChronoUnit.DAYS))
                .endDate(Instant.now().plus(62, ChronoUnit.DAYS))
                .registrationDeadline(Instant.now().plus(55, ChronoUnit.DAYS))
                .maxAttendees(2000)
                .build());

        Event event3 = eventRepository.save(Event.builder()
                .organizer(organizer)
                .title("Startup Pitch Night")
                .slug("startup-pitch-night")
                .description("Đêm gọi vốn cho các startup tiềm năng.")
                .shortDesc("Gọi vốn startup")
                .category(EventCategory.BUSINESS)
                .status(EventStatus.DRAFT)
                .venue("Online")
                .address("Online - Zoom")
                .city("Hồ Chí Minh")
                .startDate(Instant.now().plus(90, ChronoUnit.DAYS))
                .endDate(Instant.now().plus(90, ChronoUnit.DAYS))
                .maxAttendees(100)
                .build());

        TicketType tt1 = ticketTypeRepository.save(TicketType.builder()
                .event(event1)
                .name("VIP")
                .description("Ghế VIP - Khu vực đặc biệt")
                .price(new BigDecimal("500000"))
                .totalQuantity(50)
                .soldQuantity(10)
                .maxPerOrder(5)
                .saleStartDate(Instant.now().minus(10, ChronoUnit.DAYS))
                .saleEndDate(Instant.now().plus(25, ChronoUnit.DAYS))
                .isActive(true)
                .build());

        TicketType tt2 = ticketTypeRepository.save(TicketType.builder()
                .event(event1)
                .name("Regular")
                .description("Vé tiêu chuẩn")
                .price(new BigDecimal("200000"))
                .totalQuantity(300)
                .soldQuantity(45)
                .maxPerOrder(10)
                .saleStartDate(Instant.now().minus(10, ChronoUnit.DAYS))
                .saleEndDate(Instant.now().plus(25, ChronoUnit.DAYS))
                .isActive(true)
                .build());

        TicketType tt3 = ticketTypeRepository.save(TicketType.builder()
                .event(event2)
                .name("Standard")
                .description("Vé vào cửa tiêu chuẩn")
                .price(new BigDecimal("300000"))
                .totalQuantity(1000)
                .soldQuantity(200)
                .maxPerOrder(10)
                .saleStartDate(Instant.now().minus(5, ChronoUnit.DAYS))
                .saleEndDate(Instant.now().plus(50, ChronoUnit.DAYS))
                .isActive(true)
                .build());

        TicketType tt4 = ticketTypeRepository.save(TicketType.builder()
                .event(event2)
                .name("Backstage")
                .description("Vé backstage - gặp gỡ nghệ sĩ")
                .price(new BigDecimal("1500000"))
                .totalQuantity(20)
                .soldQuantity(5)
                .maxPerOrder(2)
                .saleStartDate(Instant.now().minus(5, ChronoUnit.DAYS))
                .saleEndDate(Instant.now().plus(50, ChronoUnit.DAYS))
                .isActive(true)
                .build());

        scheduleRepository.save(EventSchedule.builder()
                .event(event1)
                .title("Đăng ký & Check-in")
                .description("Đón khách và phát badge")
                .startTime(Instant.now().plus(30, ChronoUnit.DAYS).plus(7, ChronoUnit.HOURS))
                .endTime(Instant.now().plus(30, ChronoUnit.DAYS).plus(8, ChronoUnit.HOURS))
                .location("Sảnh chính")
                .speaker("Ban tổ chức")
                .build());

        scheduleRepository.save(EventSchedule.builder()
                .event(event1)
                .title("Keynote: Tương lai AI")
                .description("Bài phát biểu khai mạc về AI")
                .startTime(Instant.now().plus(30, ChronoUnit.DAYS).plus(8, ChronoUnit.HOURS))
                .endTime(Instant.now().plus(30, ChronoUnit.DAYS).plus(10, ChronoUnit.HOURS))
                .location("Hội trường A")
                .speaker("Nguyễn Văn A - CEO TechCorp")
                .build());

        scheduleRepository.save(EventSchedule.builder()
                .event(event2)
                .title("Mở cửa đón khách")
                .description("Đón khách tham dự lễ hội")
                .startTime(Instant.now().plus(60, ChronoUnit.DAYS).plus(14, ChronoUnit.HOURS))
                .endTime(Instant.now().plus(60, ChronoUnit.DAYS).plus(15, ChronoUnit.HOURS))
                .location("Cổng chính SECC")
                .speaker("")
                .build());

        scheduleRepository.save(EventSchedule.builder()
                .event(event2)
                .title("Biểu diễn khai mạc")
                .description("Mở màn lễ hội âm nhạc")
                .startTime(Instant.now().plus(60, ChronoUnit.DAYS).plus(15, ChronoUnit.HOURS))
                .endTime(Instant.now().plus(60, ChronoUnit.DAYS).plus(17, ChronoUnit.HOURS))
                .location("Sân khấu chính")
                .speaker("Các nghệ sĩ")
                .build());

        timelineRepository.save(EventTimeline.builder()
                .event(event1)
                .title("Xác nhận diễn giả")
                .description("Liên hệ và xác nhận diễn giả tham dự")
                .priority("HIGH")
                .status("COMPLETED")
                .progress(100)
                .dueDate(Instant.now().minus(5, ChronoUnit.DAYS))
                .build());

        timelineRepository.save(EventTimeline.builder()
                .event(event1)
                .title("In ấn tài liệu")
                .description("In badge, brochure, banner")
                .priority("NORMAL")
                .status("IN_PROGRESS")
                .progress(60)
                .dueDate(Instant.now().plus(15, ChronoUnit.DAYS))
                .build());

        timelineRepository.save(EventTimeline.builder()
                .event(event1)
                .title("Setup âm thanh ánh sáng")
                .description("Kiểm tra hệ thống âm thanh, ánh sáng")
                .priority("URGENT")
                .status("PENDING")
                .progress(0)
                .dueDate(Instant.now().plus(28, ChronoUnit.DAYS))
                .build());

        Registration reg1 = registrationRepository.save(Registration.builder()
                .event(event1)
                .attendee(attendee)
                .status(RegistrationStatus.CONFIRMED)
                .totalAmount(new BigDecimal("700000"))
                .discountAmount(BigDecimal.ZERO)
                .finalAmount(new BigDecimal("700000"))
                .confirmedAt(Instant.now().minus(3, ChronoUnit.DAYS))
                .build());

        Registration reg2 = registrationRepository.save(Registration.builder()
                .event(event2)
                .attendee(attendee)
                .status(RegistrationStatus.CONFIRMED)
                .totalAmount(new BigDecimal("300000"))
                .discountAmount(BigDecimal.ZERO)
                .finalAmount(new BigDecimal("300000"))
                .confirmedAt(Instant.now().minus(1, ChronoUnit.DAYS))
                .build());

        Registration reg3 = registrationRepository.save(Registration.builder()
                .event(event1)
                .attendee(user2)
                .status(RegistrationStatus.CONFIRMED)
                .totalAmount(new BigDecimal("200000"))
                .discountAmount(BigDecimal.ZERO)
                .finalAmount(new BigDecimal("200000"))
                .confirmedAt(Instant.now().minus(2, ChronoUnit.DAYS))
                .build());

        Registration reg4 = registrationRepository.save(Registration.builder()
                .event(event2)
                .attendee(user2)
                .status(RegistrationStatus.PENDING)
                .totalAmount(new BigDecimal("1500000"))
                .discountAmount(BigDecimal.ZERO)
                .finalAmount(new BigDecimal("1500000"))
                .build());

        Ticket t1 = ticketRepository.save(Ticket.builder()
                .registration(reg1)
                .ticketType(tt1)
                .ticketCode("TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .status(TicketStatus.ACTIVE)
                .holderName("Nguyen Van A")
                .holderEmail(attendee.getEmail())
                .build());

        Ticket t2 = ticketRepository.save(Ticket.builder()
                .registration(reg1)
                .ticketType(tt2)
                .ticketCode("TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .status(TicketStatus.ACTIVE)
                .holderName("Nguyen Van A")
                .holderEmail(attendee.getEmail())
                .build());

        Ticket t3 = ticketRepository.save(Ticket.builder()
                .registration(reg2)
                .ticketType(tt3)
                .ticketCode("TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .status(TicketStatus.ACTIVE)
                .holderName("Nguyen Van A")
                .holderEmail(attendee.getEmail())
                .build());

        Ticket t4 = ticketRepository.save(Ticket.builder()
                .registration(reg3)
                .ticketType(tt2)
                .ticketCode("TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .status(TicketStatus.ACTIVE)
                .holderName("User Two")
                .holderEmail(user2.getEmail())
                .build());

        for (Ticket t : List.of(t1, t2, t3, t4)) {
            qrCodeRepository.save(QrCode.builder()
                    .ticket(t)
                    .token("QR-" + t.getId().toString().substring(0, 8) + "-" + UUID.randomUUID().toString().substring(0, 8))
                    .build());
        }

        transactionRepository.save(Transaction.builder()
                .user(attendee)
                .event(event1)
                .registration(reg1)
                .type(TransactionType.TICKET_SALE)
                .status(TransactionStatus.SUCCESS)
                .amount(new BigDecimal("700000"))
                .fee(new BigDecimal("35000"))
                .paymentMethod("MOCK")
                .description("Tech Summit 2026 - VIP + Regular")
                .build());

        transactionRepository.save(Transaction.builder()
                .user(attendee)
                .event(event2)
                .registration(reg2)
                .type(TransactionType.TICKET_SALE)
                .status(TransactionStatus.SUCCESS)
                .amount(new BigDecimal("300000"))
                .fee(new BigDecimal("15000"))
                .paymentMethod("MOCK")
                .description("Summer Music Festival 2026 - Standard")
                .build());

        transactionRepository.save(Transaction.builder()
                .user(user2)
                .event(event1)
                .registration(reg3)
                .type(TransactionType.TICKET_SALE)
                .status(TransactionStatus.SUCCESS)
                .amount(new BigDecimal("200000"))
                .fee(new BigDecimal("10000"))
                .paymentMethod("VNPAY")
                .description("Tech Summit 2026 - Regular")
                .build());

        transactionRepository.save(Transaction.builder()
                .user(organizer)
                .event(event1)
                .type(TransactionType.PLATFORM_FEE)
                .status(TransactionStatus.SUCCESS)
                .amount(new BigDecimal("60000"))
                .fee(BigDecimal.ZERO)
                .paymentMethod("SYSTEM")
                .description("Phí nền tảng - Tech Summit 2026")
                .build());

        withdrawalRequestRepository.save(WithdrawalRequest.builder()
                .organizer(organizer)
                .amount(new BigDecimal("5000000"))
                .bankName("Vietcombank")
                .bankAccount("1234567890")
                .accountOwner("Nguyễn Văn A")
                .status(WithdrawalStatus.COMPLETED)
                .requestedAt(Instant.now().minus(10, ChronoUnit.DAYS))
                .processedAt(Instant.now().minus(8, ChronoUnit.DAYS))
                .build());

        withdrawalRequestRepository.save(WithdrawalRequest.builder()
                .organizer(organizer)
                .amount(new BigDecimal("2000000"))
                .bankName("Techcombank")
                .bankAccount("0987654321")
                .accountOwner("Nguyễn Văn A")
                .status(WithdrawalStatus.PENDING)
                .requestedAt(Instant.now().minus(2, ChronoUnit.DAYS))
                .build());

        invitationRepository.save(Invitation.builder()
                .event(event1)
                .invitedBy(organizer)
                .email("invited1@test.com")
                .token(UUID.randomUUID().toString().replace("-", ""))
                .status(InviteStatus.PENDING)
                .build());

        invitationRepository.save(Invitation.builder()
                .event(event1)
                .invitedBy(organizer)
                .email("invited2@test.com")
                .token(UUID.randomUUID().toString().replace("-", ""))
                .status(InviteStatus.ACCEPTED)
                .respondedAt(Instant.now().minus(1, ChronoUnit.DAYS))
                .build());

        eventTemplateRepository.save(EventTemplate.builder()
                .organizer(organizer)
                .name("Hội nghị công nghệ")
                .description("Template cho sự kiện công nghệ")
                .category(EventCategory.TECH)
                .venue("Hội trường")
                .address("123 Nguyễn Huệ")
                .city("Hồ Chí Minh")
                .tags(List.of("tech", "hội thảo"))
                .build());

        eventTemplateRepository.save(EventTemplate.builder()
                .organizer(organizer)
                .name("Lễ hội âm nhạc")
                .description("Template cho sự kiện âm nhạc ngoài trời")
                .category(EventCategory.MUSIC)
                .venue("Sân khấu ngoài trời")
                .address("456 Trần Hưng Đạo")
                .city("Đà Nẵng")
                .tags(List.of("music", "festival"))
                .build());

        log.info("Sample data seeded successfully!");
    }
}
