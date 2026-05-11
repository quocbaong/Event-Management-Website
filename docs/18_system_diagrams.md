# 📊 System Diagrams — Event Management Backend

Tập hợp toàn bộ sơ đồ kiến trúc, luồng dữ liệu và thiết kế hệ thống.

---

## 1. System Architecture Diagram

```mermaid
graph TB;

    subgraph Client["Client Layer"]
        FE["React SPA\nlocalhost:5173"];
    end

    subgraph Infra["Infrastructure"]
        NGINX["Nginx Reverse Proxy\nSSL · Rate Limiting · Gzip"];
    end

    subgraph App["Spring Boot Application :8080"]
        direction TB;

        SEC["Spring Security Filter Chain\nJWT · CORS · Rate Limit"];
        CTRL["Controllers\nREST API /api/v1/**"];
        SVC["Service Layer\nBusiness Logic · @Transactional"];
        REPO["Repository Layer\nSpring Data JPA · Specification"];
        DOM["Domain Layer\n@Entity · Enum · Events"];
    end

    subgraph Storage["Storage Layer"]
        PG[("PostgreSQL 16\n:5432")];
        REDIS[("Redis 7\n:6379\nCache · Rate Limit")];
        CDN["Cloudinary\nImage Storage"];
    end

    subgraph Async["Async Processing"]
        EVT["Spring Domain Events\nApplicationEventPublisher"];
        EMAIL["Spring Mail\nSMTP · Thymeleaf"];
        NOTIF["Notification Service"];
    end

    FE -->|HTTPS| NGINX;
    NGINX -->|HTTP :8080| SEC;
    SEC --> CTRL;
    CTRL --> SVC;
    SVC --> REPO;
    REPO --> DOM;
    REPO -->|SQL| PG;
    SVC -->|Cache| REDIS;
    SVC -->|Upload| CDN;
    SVC -->|Publish Event| EVT;
    EVT -->|@Async| EMAIL;
    EVT -->|@Async| NOTIF;
    NOTIF --> REPO;

    style Client fill:#dbeafe,stroke:#3b82f6;
    style App fill:#f0fdf4,stroke:#22c55e;
    style Storage fill:#fef3c7,stroke:#f59e0b;
    style Async fill:#fdf4ff,stroke:#a855f7;
```
---

## 2. Layered Architecture (Chi tiết)

```mermaid
graph TB
    subgraph PL["Presentation Layer"]
        direction LR
        JwtF["JwtAuthenticationFilter"]
        RateF["RateLimitFilter"]
        CTRL2["@RestController"]
        ADV["@ControllerAdvice<br/>GlobalExceptionHandler"]
    end

    subgraph SL["Service Layer"]
        direction LR
        AuthSvc["AuthService"]
        EventSvc["EventService"]
        RegSvc["RegistrationService"]
        FinSvc["FinanceService"]
        NotiSvc["NotificationService"]
    end

    subgraph RL["Repository Layer"]
        direction LR
        JPA["JpaRepository"]
        SPEC["Specification<br/>(Dynamic Filter)"]
        PROJ["Projection<br/>(Partial SELECT)"]
    end

    subgraph DL["Domain Layer"]
        direction LR
        ENT["@Entity<br/>User · Event · Ticket"]
        ENUM["Enums<br/>EventStatus · UserRole"]
        DEVT["Domain Events<br/>RegistrationConfirmedEvent"]
    end

    HTTP["HTTP Request"] --> JwtF
    JwtF --> RateF
    RateF --> CTRL2
    CTRL2 --> SL
    CTRL2 --> ADV
    SL --> RL
    RL --> PG2[("PostgreSQL")]
    SL --> REDIS2[("Redis")]
    DL -.-> ENT

    style PL fill:#dbeafe,stroke:#3b82f6
    style SL fill:#dcfce7,stroke:#16a34a
    style RL fill:#fef9c3,stroke:#ca8a04
    style DL fill:#fce7f3,stroke:#db2777
```

---

## 3. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    users {
        uuid id PK
        string email UK
        string password_hash
        user_role role
        boolean is_verified
        boolean is_active
        timestamp created_at
    }

    organizer_profiles {
        uuid id PK
        uuid user_id FK
        string company_name
        string phone
        numeric available_balance
        numeric total_revenue
        boolean is_verified
    }

    attendee_profiles {
        uuid id PK
        uuid user_id FK
        string display_name
        string phone
        string avatar_url
        date date_of_birth
    }

    refresh_tokens {
        uuid id PK
        uuid user_id FK
        string token_hash
        boolean is_revoked
        timestamp expires_at
    }

    events {
        uuid id PK
        uuid organizer_id FK
        string title
        string slug UK
        event_status status
        event_category category
        string city
        timestamp start_date
        timestamp end_date
        integer current_attendees
        integer max_attendees
        boolean is_featured
    }

    ticket_types {
        uuid id PK
        uuid event_id FK
        string name
        numeric price
        integer total_quantity
        integer sold_quantity
        integer max_per_order
    }

    registrations {
        uuid id PK
        uuid event_id FK
        uuid attendee_id FK
        registration_status status
        numeric final_amount
        timestamp confirmed_at
    }

    tickets {
        uuid id PK
        uuid registration_id FK
        uuid ticket_type_id FK
        string ticket_code UK
        ticket_status status
        string holder_name
        timestamp checked_in_at
    }

    qr_codes {
        uuid id PK
        uuid ticket_id FK
        string token UK
        timestamp expires_at
    }

    transactions {
        uuid id PK
        uuid user_id FK
        uuid event_id FK
        uuid registration_id FK
        transaction_type type
        numeric amount
        transaction_status status
        jsonb metadata
    }

    withdrawal_requests {
        uuid id PK
        uuid organizer_id FK
        numeric amount
        string bank_account
        withdrawal_status status
        timestamp requested_at
    }

    reviews {
        uuid id PK
        uuid event_id FK
        uuid user_id FK
        numeric rating
        text comment
    }

    notifications {
        uuid id PK
        uuid user_id FK
        notification_type type
        string title
        boolean is_read
        jsonb data
    }

    event_schedules {
        uuid id PK
        uuid event_id FK
        string title
        timestamp start_time
        timestamp end_time
        string speaker
    }

    event_timelines {
        uuid id PK
        uuid event_id FK
        string title
        timestamp due_date
        string status
        string priority
        integer progress
    }

    users ||--o| organizer_profiles : "has"
    users ||--o| attendee_profiles : "has"
    users ||--o{ refresh_tokens : "has"
    users ||--o{ events : "organizes"
    users ||--o{ registrations : "books"
    users ||--o{ reviews : "writes"
    users ||--o{ notifications : "receives"
    users ||--o{ withdrawal_requests : "requests"

    events ||--o{ ticket_types : "has"
    events ||--o{ registrations : "has"
    events ||--o{ reviews : "has"
    events ||--o{ transactions : "has"
    events ||--o{ event_schedules : "has"
    events ||--o{ event_timelines : "has"

    registrations ||--o{ tickets : "contains"
    registrations ||--o| transactions : "paid via"

    tickets ||--o| qr_codes : "has"
    ticket_types ||--o{ tickets : "generates"
```

---

## 4. State Machine — Event Status

```mermaid
stateDiagram-v2
    [*] --> DRAFT : Organizer tạo sự kiện

    DRAFT --> PUBLISHED : Publish (organizer)
    DRAFT --> CANCELLED : Huỷ khi chưa có ai đăng ký

    PUBLISHED --> ON_SALE : Mở bán vé
    PUBLISHED --> CANCELLED : Huỷ trước khi mở bán

    ON_SALE --> SOLD_OUT : Hết toàn bộ vé
    ON_SALE --> ONGOING : Đến ngày diễn ra
    ON_SALE --> CANCELLED : Huỷ (hoàn tiền tất cả)

    SOLD_OUT --> ONGOING : Đến ngày diễn ra
    SOLD_OUT --> CANCELLED : Huỷ đặc biệt (hoàn tiền)

    ONGOING --> COMPLETED : Kết thúc sự kiện

    CANCELLED --> [*]
    COMPLETED --> [*]

    note right of ON_SALE : Có thể mua vé
    note right of ONGOING : Check-in QR hoạt động
    note right of COMPLETED : Mở review
```

---

## 5. State Machine — Registration & Ticket

```mermaid
stateDiagram-v2
    direction LR

    state "Registration" as R {
        [*] --> PENDING : POST /registrations
        PENDING --> CONFIRMED : Thanh toán thành công
        PENDING --> CANCELLED : Timeout / Huỷ trước thanh toán
        CONFIRMED --> CANCELLED : Huỷ trước deadline
        CONFIRMED --> REFUNDED : Admin xử lý hoàn tiền
    }

    state "Ticket" as T {
        [*] --> ACTIVE : Tạo sau khi Registration CONFIRMED
        ACTIVE --> USED : QR Check-in thành công
        ACTIVE --> CANCELLED : Registration bị huỷ
        ACTIVE --> REFUNDED : Hoàn tiền
    }

    CONFIRMED --> ACTIVE : Tạo ticket(s)
```

---

## 6. Sequence Diagram — Luồng Mua Vé

```mermaid
sequenceDiagram
    actor Attendee
    participant FE as React Frontend
    participant API as Spring Boot API
    participant DB as PostgreSQL
    participant Redis
    participant EventBus as Spring Events

    Attendee->>FE: Chọn vé + Click "Đăng ký"
    FE->>API: POST /api/v1/registrations {eventId, items[]}
    
    API->>DB: SELECT event (check status = ON_SALE)
    DB-->>API: Event info
    
    API->>DB: SELECT ticket_types (check available qty)
    DB-->>API: Ticket type info
    
    API->>Redis: LOCK ticket qty (15 phút TTL)
    Redis-->>API: OK
    
    API->>DB: BEGIN TRANSACTION
    API->>DB: INSERT registration (status=PENDING)
    API->>DB: COMMIT
    DB-->>API: registration {id, finalAmount}
    
    API-->>FE: 201 {registrationId, finalAmount}
    FE->>Attendee: Hiển thị trang thanh toán

    Attendee->>FE: Xác nhận thanh toán
    FE->>API: POST /api/v1/registrations/{id}/confirm
    
    API->>DB: BEGIN TRANSACTION
    API->>DB: UPDATE registration (CONFIRMED)
    API->>DB: INSERT transaction (TICKET_SALE, SUCCESS)
    API->>DB: INSERT tickets[] + qr_codes[]
    API->>DB: UPDATE event.current_attendees++
    API->>DB: UPDATE organizer.available_balance += netAmount
    API->>DB: COMMIT
    
    API->>Redis: RELEASE lock
    
    API->>EventBus: publishEvent(RegistrationConfirmedEvent)
    
    Note over EventBus: @Async - không block response
    EventBus-->>API: 📧 EmailListener → gửi email vé
    EventBus-->>API: 🔔 NotificationListener → tạo notification
    
    API-->>FE: 200 {tickets[], qrCodes[]}
    FE->>Attendee: ✅ Hiển thị vé thành công
```

---

## 7. Sequence Diagram — QR Check-in

```mermaid
sequenceDiagram
    actor Staff as Organizer/Staff
    participant App as Mobile/Web App
    participant API as Spring Boot API
    participant DB as PostgreSQL

    Staff->>App: Scan QR Code của attendee
    App->>API: POST /api/v1/organizer/events/{eventId}/checkin<br/>{qrToken: "eyJhbGci..."}
    
    API->>API: jwtProvider.verify(qrToken, QR_SECRET)
    
    alt JWT không hợp lệ / giả mạo
        API-->>App: 400 INVALID_QR_CODE
        App->>Staff: ❌ Hiển thị lỗi "QR không hợp lệ"
    end
    
    API->>API: Decode payload → {ticketCode, eventId}
    
    API->>DB: SELECT ticket WHERE code = ticketCode
    DB-->>API: Ticket info
    
    alt Vé không thuộc event này
        API-->>App: 403 FORBIDDEN
    end
    
    alt ticket.status = USED
        API->>DB: SELECT checkedInAt
        DB-->>API: checkedInAt timestamp
        API-->>App: 400 TICKET_ALREADY_USED {checkedInAt}
        App->>Staff: ⚠️ "Vé đã check-in lúc HH:mm dd/MM"
    end
    
    alt ticket.status = CANCELLED / REFUNDED
        API-->>App: 400 TICKET_INVALID_STATUS
    end
    
    API->>DB: UPDATE ticket SET status=USED, checked_in_at=NOW()
    DB-->>API: OK
    
    API-->>App: 200 {valid: true, holderName, ticketType}
    App->>Staff: ✅ "Chào mừng [Tên]! Vé [loại vé]"
```

---

## 8. Sequence Diagram — Luồng Rút Tiền

```mermaid
sequenceDiagram
    actor Organizer
    actor Admin
    participant FE as React Frontend
    participant API as Spring Boot API
    participant DB as PostgreSQL
    participant EventBus as Spring Events
    participant Email as Email Service

    Organizer->>FE: Điền form rút tiền (số tiền, ngân hàng)
    FE->>API: POST /api/v1/organizer/finance/withdrawal<br/>{amount, bankAccount, bankName, accountOwner}
    
    API->>DB: SELECT organizer.available_balance
    DB-->>API: balance = 85,000,000đ
    
    alt amount > available_balance
        API-->>FE: 422 INSUFFICIENT_BALANCE
    end
    
    alt amount < 100,000đ
        API-->>FE: 422 WITHDRAWAL_MIN_AMOUNT
    end
    
    API->>DB: SELECT count(pending withdrawals)
    alt Đã có pending request
        API-->>FE: 422 PENDING_WITHDRAWAL_EXISTS
    end
    
    API->>DB: BEGIN TRANSACTION
    API->>DB: UPDATE organizer.available_balance -= amount
    API->>DB: INSERT withdrawal_request (status=PENDING)
    API->>DB: COMMIT
    
    API->>EventBus: publishEvent(WithdrawalCreatedEvent)
    EventBus-->>API: 🔔 Notify Admin có yêu cầu mới
    
    API-->>FE: 201 {requestId, status: PENDING}
    FE->>Organizer: ✅ "Yêu cầu đã gửi, đang chờ duyệt"
    
    Note over Admin,DB: Admin xem danh sách & duyệt
    Admin->>API: PATCH /api/v1/admin/finance/withdrawals/{id}/approve
    
    API->>DB: UPDATE withdrawal (status=COMPLETED, processedAt=NOW())
    API->>DB: INSERT transaction (WITHDRAWAL, SUCCESS)
    
    API->>EventBus: publishEvent(WithdrawalProcessedEvent)
    EventBus-->>Email: 📧 Gửi email thông báo cho Organizer
    EventBus-->>API: 🔔 Notification cho Organizer
    
    API-->>Admin: 200 OK
    Email-->>Organizer: 📧 "Yêu cầu rút 50,000,000đ đã được duyệt"
```

---

## 9. Sequence Diagram — Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant FE as React Frontend
    participant API as Spring Boot API
    participant DB as PostgreSQL
    participant Email as Email Service

    Note over User,Email: Đăng ký
    User->>FE: Điền form đăng ký
    FE->>API: POST /api/v1/auth/register
    API->>DB: INSERT user (is_verified=false)
    API->>DB: INSERT profile (Organizer/Attendee)
    API->>Email: Queue verification email (JWT 24h)
    API-->>FE: 201 "Kiểm tra email để xác thực"
    Email-->>User: 📧 Link verify

    User->>API: GET /api/v1/auth/verify-email?token=xxx
    API->>API: Verify JWT token
    API->>DB: UPDATE user SET is_verified=true
    API-->>User: 200 "Xác thực thành công"

    Note over User,Email: Đăng nhập
    User->>FE: Nhập email + password
    FE->>API: POST /api/v1/auth/login
    API->>DB: SELECT user WHERE email=?
    API->>API: BCrypt.matches(password, hash)
    API->>API: Generate accessToken (JWT 15m)
    API->>API: Generate refreshToken (UUID)
    API->>DB: INSERT refresh_token (hashed)
    API-->>FE: 200 {accessToken, user}<br/>Set-Cookie: refreshToken (httpOnly)

    Note over User,Email: Tự động refresh
    FE->>API: POST /api/v1/auth/refresh (cookie tự gửi)
    API->>DB: SELECT refresh_token WHERE hash=?
    alt Token đã bị revoke (bảo mật)
        API->>DB: REVOKE ALL tokens của user
        API-->>FE: 401 Token reuse detected
    end
    API->>DB: Revoke old refresh_token
    API->>DB: INSERT new refresh_token
    API-->>FE: 200 {accessToken mới}
```

---

## 10. Component Diagram — Security Filter Chain

```mermaid
graph LR
    REQ["HTTP Request"] --> C1

    subgraph SC["Spring Security Filter Chain"]
        C1["CorsFilter<br/>Check Origin whitelist"]
        C2["RateLimitFilter<br/>Redis token bucket"]
        C3["JwtAuthenticationFilter<br/>Verify Bearer token"]
        C4["SecurityContextHolder<br/>Set Authentication"]
        C5["AuthorizationFilter<br/>Check @PreAuthorize"]
        C1 --> C2 --> C3 --> C4 --> C5
    end

    C5 --> CTRL3["@RestController<br/>Handler Method"]

    subgraph ERR["Error Paths"]
        E1["401 Unauthorized<br/>No/Invalid token"]
        E2["403 Forbidden<br/>Wrong role"]
        E3["429 Too Many Requests<br/>Rate limit exceeded"]
    end

    C3 -.->|Invalid JWT| E1
    C5 -.->|Wrong role| E2
    C2 -.->|Limit hit| E3

    style SC fill:#f0fdf4,stroke:#16a34a
    style ERR fill:#fef2f2,stroke:#ef4444
```

---

## 11. Class Diagram — Core Domain

```mermaid
classDiagram
    class User {
        +UUID id
        +String email
        +String passwordHash
        +UserRole role
        +Boolean isVerified
        +Boolean isActive
        +Instant createdAt
    }

    class OrganizerProfile {
        +UUID id
        +UUID userId
        +String companyName
        +BigDecimal availableBalance
        +BigDecimal totalRevenue
        +Boolean isVerified
    }

    class Event {
        +UUID id
        +UUID organizerId
        +String title
        +String slug
        +EventStatus status
        +EventCategory category
        +Integer currentAttendees
        +Integer maxAttendees
        +canTransitionTo(EventStatus) Boolean
        +isRegistrationOpen() Boolean
        +getLowestPrice() BigDecimal
    }

    class TicketType {
        +UUID id
        +UUID eventId
        +String name
        +BigDecimal price
        +Integer totalQuantity
        +Integer soldQuantity
        +getAvailableQuantity() Integer
        +isSoldOut() Boolean
    }

    class Registration {
        +UUID id
        +UUID eventId
        +UUID attendeeId
        +RegistrationStatus status
        +BigDecimal finalAmount
        +Instant confirmedAt
        +confirm()
        +cancel()
    }

    class Ticket {
        +UUID id
        +String ticketCode
        +TicketStatus status
        +String holderName
        +Instant checkedInAt
        +checkIn(UUID staffId)
        +isValid() Boolean
    }

    class Transaction {
        +UUID id
        +UUID userId
        +UUID eventId
        +TransactionType type
        +BigDecimal amount
        +TransactionStatus status
        +JsonNode metadata
    }

    class WithdrawalRequest {
        +UUID id
        +UUID organizerId
        +BigDecimal amount
        +String bankAccount
        +WithdrawalStatus status
        +approve(UUID adminId, String note)
        +reject(UUID adminId, String reason)
    }

    User "1" --> "0..1" OrganizerProfile : has
    User "1" --> "0..*" Event : organizes
    User "1" --> "0..*" Registration : books
    User "1" --> "0..*" WithdrawalRequest : requests
    Event "1" --> "1..*" TicketType : has
    Event "1" --> "0..*" Registration : receives
    Registration "1" --> "1..*" Ticket : contains
    Registration "1" --> "0..1" Transaction : paid via
    TicketType "1" --> "0..*" Ticket : generates
```

---

## 12. Package/Module Dependency Diagram

```mermaid
graph TB
    subgraph WEB["web/ (Presentation)"]
        CTRL4["controllers/"]
        DTO["dto/request · response"]
        MAP["mapper/ (MapStruct)"]
        ADV2["advice/ (Exception)"]
    end

    subgraph SVC2["service/ (Business)"]
        ASVC["AuthService"]
        ESVC["EventService"]
        RSVC["RegistrationService"]
        FSVC["FinanceService"]
    end

    subgraph INFRA["infrastructure/ (External)"]
        EMSVC["email/EmailService"]
        STRSVC["storage/CloudinaryService"]
        QRSVC["qr/QrCodeService"]
        PAY["payment/PaymentStrategy"]
        LSTN["listener/EventListeners"]
    end

    subgraph REPO2["repository/ (Data)"]
        JREP["JpaRepository"]
        SPECS["specification/"]
    end

    subgraph DOM2["domain/ (Core)"]
        ENT2["entity/"]
        ENUMS["enums/"]
        DEVTS["event/ (Domain Events)"]
    end

    subgraph CFG["config/"]
        SECCFG["SecurityConfig"]
        RDSCFG["RedisConfig"]
        SWGCFG["SwaggerConfig"]
    end

    CTRL4 --> DTO
    CTRL4 --> MAP
    CTRL4 --> SVC2
    SVC2 --> REPO2
    SVC2 --> INFRA
    SVC2 --> DOM2
    REPO2 --> DOM2
    LSTN --> EMSVC
    LSTN --> STRSVC
    CFG --> SVC2

    style WEB fill:#dbeafe,stroke:#3b82f6
    style SVC2 fill:#dcfce7,stroke:#16a34a
    style INFRA fill:#fdf4ff,stroke:#a855f7
    style REPO2 fill:#fef9c3,stroke:#ca8a04
    style DOM2 fill:#fce7f3,stroke:#db2777
    style CFG fill:#f1f5f9,stroke:#64748b
```
