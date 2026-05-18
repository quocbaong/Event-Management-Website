-- V13: Seed sample data for development
-- Requires pgcrypto for bcrypt password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================================
-- CLEAN UP EXISTING DATA TO ENSURE IDEMPOTENCY
-- ============================================================================
DELETE FROM event_templates WHERE name IN ('Hội nghị công nghệ', 'Lễ hội âm nhạc');
DELETE FROM invitations WHERE email IN ('invited1@test.com', 'invited2@test.com');
DELETE FROM qr_codes WHERE token LIKE 'QR-SEED-%';
DELETE FROM tickets WHERE holder_email IN ('attendee@test.com', 'user2@test.com', 'attendee@prestigeplanner.com');
DELETE FROM registrations WHERE attendee_id IN (SELECT id FROM users WHERE email IN ('attendee@test.com', 'user2@test.com', 'attendee@prestigeplanner.com'));
DELETE FROM transactions WHERE user_id IN (SELECT id FROM users WHERE email IN ('organizer@test.com', 'attendee@test.com', 'user2@test.com', 'organizer@prestigeplanner.com', 'admin@prestigeplanner.com', 'attendee@prestigeplanner.com'));
DELETE FROM withdrawal_requests WHERE organizer_id IN (SELECT id FROM users WHERE email IN ('organizer@test.com', 'organizer@prestigeplanner.com'));
DELETE FROM event_schedules WHERE event_id IN (SELECT id FROM events WHERE slug IN ('tech-summit-2026', 'summer-music-festival-2026', 'startup-pitch-night'));
DELETE FROM event_timelines WHERE event_id IN (SELECT id FROM events WHERE slug IN ('tech-summit-2026', 'summer-music-festival-2026', 'startup-pitch-night'));
DELETE FROM ticket_types WHERE event_id IN (SELECT id FROM events WHERE slug IN ('tech-summit-2026', 'summer-music-festival-2026', 'startup-pitch-night'));
DELETE FROM events WHERE slug IN ('tech-summit-2026', 'summer-music-festival-2026', 'startup-pitch-night');
DELETE FROM venues WHERE name IN ('Nhà hát Lớn Hà Nội', 'SECC - Trung tâm Hội chợ Triển lãm');
DELETE FROM attendee_profiles WHERE user_id IN (SELECT id FROM users WHERE email IN ('attendee@test.com', 'user2@test.com', 'admin@prestigeplanner.com', 'organizer@prestigeplanner.com', 'attendee@prestigeplanner.com'));
DELETE FROM organizer_profiles WHERE user_id IN (SELECT id FROM users WHERE email IN ('organizer@test.com', 'organizer@prestigeplanner.com'));
DELETE FROM users WHERE email IN ('organizer@test.com', 'attendee@test.com', 'user2@test.com', 'admin@prestigeplanner.com', 'organizer@prestigeplanner.com', 'attendee@prestigeplanner.com');

-- Xóa dữ liệu bulk (nếu có) để tránh lỗi duplicate
DELETE FROM transactions WHERE description = 'Mua vé tự động';
DELETE FROM tickets WHERE ticket_code LIKE 'TKT-AUTO-%';
DELETE FROM registrations WHERE attendee_id IN (SELECT id FROM users WHERE email LIKE 'attendee_%@prestigeplanner.com');
DELETE FROM ticket_types WHERE event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%');
DELETE FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%';
DELETE FROM attendee_profiles WHERE user_id IN (SELECT id FROM users WHERE email LIKE 'attendee_%@prestigeplanner.com');
DELETE FROM users WHERE email LIKE 'attendee_%@prestigeplanner.com';

-- ============================================================================
-- INSERT SEED DATA
-- ============================================================================
WITH u AS (
    INSERT INTO users (email, password_hash, role, is_verified, is_active)
    VALUES
      ('admin@prestigeplanner.com', crypt('password123', gen_salt('bf')), 'ADMIN', TRUE, TRUE),
      ('organizer@prestigeplanner.com', crypt('password123', gen_salt('bf')), 'ORGANIZER', TRUE, TRUE),
      ('attendee@prestigeplanner.com', crypt('password123', gen_salt('bf')), 'ATTENDEE', TRUE, TRUE),
      ('organizer@test.com', crypt('password123', gen_salt('bf')), 'ORGANIZER', TRUE, TRUE),
      ('attendee@test.com', crypt('password123', gen_salt('bf')), 'ATTENDEE', TRUE, TRUE),
      ('user2@test.com', crypt('password123', gen_salt('bf')), 'ATTENDEE', TRUE, TRUE)
    RETURNING id, email
)
-- ============================================================================
-- ORGANIZER PROFILES
-- ============================================================================
, op AS (
    INSERT INTO organizer_profiles (user_id, company_name, phone, bio, website, logo_url, bank_account, bank_name, bank_owner, is_verified, total_revenue, available_balance)
    SELECT id, 'Prestige Planner Corp', '0123456789', 'We organize standard events', 'https://prestigeplanner.com', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', '1234567890', 'Vietcombank', 'Nguyễn Văn A', TRUE, 15000000.00, 12000000.00
    FROM u WHERE email = 'organizer@prestigeplanner.com'
    UNION ALL
    SELECT id, 'Test Company', '0987654321', 'We test things', 'https://testcompany.com', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3', '0987654321', 'Techcombank', 'Nguyễn Văn B', TRUE, 10000000.00, 8000000.00
    FROM u WHERE email = 'organizer@test.com'
    RETURNING id
)
-- ============================================================================
-- ATTENDEE PROFILES
-- ============================================================================
, ap AS (
    INSERT INTO attendee_profiles (user_id, display_name, phone, avatar_url, date_of_birth, address)
    SELECT id, 'Prestige Planner Admin', '0123456789', 'https://i.pravatar.cc/150?img=1', '1990-01-01'::date, 'Hà Nội'
    FROM u WHERE email = 'admin@prestigeplanner.com'
    UNION ALL
    SELECT id, 'Prestige Planner Organizer', '0123456789', 'https://i.pravatar.cc/150?img=2', '1990-01-01'::date, 'Hà Nội'
    FROM u WHERE email = 'organizer@prestigeplanner.com'
    UNION ALL
    SELECT id, 'Prestige Planner Attendee', '0123456789', 'https://i.pravatar.cc/150?img=3', '1995-05-05'::date, 'Hồ Chí Minh'
    FROM u WHERE email = 'attendee@prestigeplanner.com'
    UNION ALL
    SELECT id, 'Test Attendee 1', '0987654321', 'https://i.pravatar.cc/150?img=4', '1996-06-06'::date, 'Đà Nẵng'
    FROM u WHERE email = 'attendee@test.com'
    UNION ALL
    SELECT id, 'Test Attendee 2', '0112233445', 'https://i.pravatar.cc/150?img=5', '1997-07-07'::date, 'Hải Phòng'
    FROM u WHERE email = 'user2@test.com'
    RETURNING id
)
-- ============================================================================
-- VENUES (Manually generate id since V9 table schema lacks gen_random_uuid default)
-- ============================================================================
, v AS (
    INSERT INTO venues (id, organizer_id, name, address, city, capacity, image_url)
    SELECT gen_random_uuid(), id, 'Nhà hát Lớn Hà Nội', 'Số 1 Tràng Tiền', 'Hà Nội', 800,
           'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'
    FROM u WHERE email = 'organizer@test.com'
    UNION ALL
    SELECT gen_random_uuid(), id, 'SECC - Trung tâm Hội chợ Triển lãm', '799 Nguyễn Văn Linh, Quận 7', 'Hồ Chí Minh', 3000,
           'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400'
    FROM u WHERE email = 'organizer@test.com'
    RETURNING id
)
-- ============================================================================
-- EVENTS
-- ============================================================================
, e AS (
    INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, registration_deadline, max_attendees)
    SELECT
        id,
        'Tech Summit 2026',
        'tech-summit-2026',
        'Hội nghị công nghệ lớn nhất năm 2026 với sự tham gia của các diễn giả hàng đầu.',
        'Hội nghị công nghệ số 1 Việt Nam',
        'TECH'::event_category, 'PUBLISHED'::event_status,
        'Nhà hát Lớn Hà Nội', 'Số 1 Tràng Tiền', 'Hà Nội',
        NOW() + INTERVAL '30 days', NOW() + INTERVAL '31 days', NOW() + INTERVAL '28 days', 500
    FROM u WHERE email = 'organizer@test.com'
    UNION ALL
    SELECT
        id,
        'Summer Music Festival 2026',
        'summer-music-festival-2026',
        'Lễ hội âm nhạc mùa hè với nhiều nghệ sĩ nổi tiếng.',
        'Lễ hội âm nhạc lớn nhất hè',
        'MUSIC'::event_category, 'PUBLISHED'::event_status,
        'SECC - Trung tâm Hội chợ Triển lãm', '799 Nguyễn Văn Linh, Quận 7', 'Hồ Chí Minh',
        NOW() + INTERVAL '60 days', NOW() + INTERVAL '62 days', NOW() + INTERVAL '55 days', 2000
    FROM u WHERE email = 'organizer@test.com'
    UNION ALL
    SELECT
        id,
        'Startup Pitch Night',
        'startup-pitch-night',
        'Đêm gọi vốn cho các startup tiềm năng.',
        'Gọi vốn startup',
        'BUSINESS'::event_category, 'DRAFT'::event_status,
        'Online', 'Online - Zoom', 'Hồ Chí Minh',
        NOW() + INTERVAL '90 days', NOW() + INTERVAL '90 days' + INTERVAL '4 hours', NULL, 100
    FROM u WHERE email = 'organizer@test.com'
    RETURNING id, title
)
-- ============================================================================
-- TICKET TYPES
-- ============================================================================
, tt AS (
    INSERT INTO ticket_types (event_id, name, description, price, total_quantity, sold_quantity, max_per_order, sale_start_date, sale_end_date, is_active)
    SELECT id, 'VIP', 'Ghế VIP - Khu vực đặc biệt', 500000, 50, 10, 5,
           NOW() - INTERVAL '10 days', NOW() + INTERVAL '25 days', TRUE
    FROM e WHERE title = 'Tech Summit 2026'
    UNION ALL
    SELECT id, 'Regular', 'Vé tiêu chuẩn', 200000, 300, 45, 10,
           NOW() - INTERVAL '10 days', NOW() + INTERVAL '25 days', TRUE
    FROM e WHERE title = 'Tech Summit 2026'
    UNION ALL
    SELECT id, 'Standard', 'Vé vào cửa tiêu chuẩn', 300000, 1000, 200, 10,
           NOW() - INTERVAL '5 days', NOW() + INTERVAL '50 days', TRUE
    FROM e WHERE title = 'Summer Music Festival 2026'
    UNION ALL
    SELECT id, 'Backstage', 'Vé backstage - gặp gỡ nghệ sĩ', 1500000, 20, 5, 2,
           NOW() - INTERVAL '5 days', NOW() + INTERVAL '50 days', TRUE
    FROM e WHERE title = 'Summer Music Festival 2026'
    RETURNING id, name, event_id
)
-- ============================================================================
-- SCHEDULES
-- ============================================================================
, s AS (
    INSERT INTO event_schedules (event_id, title, description, start_time, end_time, location, speaker)
    SELECT id, 'Đăng ký & Check-in', 'Đón khách và phát badge',
           NOW() + INTERVAL '30 days' + INTERVAL '7 hours',
           NOW() + INTERVAL '30 days' + INTERVAL '8 hours',
           'Sảnh chính', 'Ban tổ chức'
    FROM e WHERE title = 'Tech Summit 2026'
    UNION ALL
    SELECT id, 'Keynote: Tương lai AI', 'Bài phát biểu khai mạc về AI',
           NOW() + INTERVAL '30 days' + INTERVAL '8 hours',
           NOW() + INTERVAL '30 days' + INTERVAL '10 hours',
           'Hội trường A', 'Nguyễn Văn A - CEO TechCorp'
    FROM e WHERE title = 'Tech Summit 2026'
    UNION ALL
    SELECT id, 'Mở cửa đón khách', 'Đón khách tham dự lễ hội',
           NOW() + INTERVAL '60 days' + INTERVAL '14 hours',
           NOW() + INTERVAL '60 days' + INTERVAL '15 hours',
           'Cổng chính SECC', ''
    FROM e WHERE title = 'Summer Music Festival 2026'
    UNION ALL
    SELECT id, 'Biểu diễn khai mạc', 'Mở màn lễ hội âm nhạc',
           NOW() + INTERVAL '60 days' + INTERVAL '15 hours',
           NOW() + INTERVAL '60 days' + INTERVAL '17 hours',
           'Sân khấu chính', 'Các nghệ sĩ'
    FROM e WHERE title = 'Summer Music Festival 2026'
    RETURNING id
)
-- ============================================================================
-- TIMELINES
-- ============================================================================
, tl AS (
    INSERT INTO event_timelines (event_id, title, description, priority, status, progress, due_date)
    SELECT id, 'Xác nhận diễn giả', 'Liên hệ và xác nhận diễn giả tham dự',
           'HIGH', 'COMPLETED', 100, NOW() - INTERVAL '5 days'
    FROM e WHERE title = 'Tech Summit 2026'
    UNION ALL
    SELECT id, 'In ấn tài liệu', 'In badge, brochure, banner',
           'NORMAL', 'IN_PROGRESS', 60, NOW() + INTERVAL '15 days'
    FROM e WHERE title = 'Tech Summit 2026'
    UNION ALL
    SELECT id, 'Setup âm thanh ánh sáng', 'Kiểm tra hệ thống âm thanh, ánh sáng',
           'URGENT', 'PENDING', 0, NOW() + INTERVAL '28 days'
    FROM e WHERE title = 'Tech Summit 2026'
    RETURNING id
)
-- ============================================================================
-- REGISTRATIONS
-- ============================================================================
, r AS (
    INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at)
    SELECT e.id, u.id, 'CONFIRMED'::registration_status, 700000, 0, 700000, NOW() - INTERVAL '3 days'
    FROM e, u
    WHERE e.title = 'Tech Summit 2026' AND u.email = 'attendee@test.com'
    UNION ALL
    SELECT e.id, u.id, 'CONFIRMED'::registration_status, 300000, 0, 300000, NOW() - INTERVAL '1 day'
    FROM e, u
    WHERE e.title = 'Summer Music Festival 2026' AND u.email = 'attendee@test.com'
    UNION ALL
    SELECT e.id, u.id, 'CONFIRMED'::registration_status, 200000, 0, 200000, NOW() - INTERVAL '2 days'
    FROM e, u
    WHERE e.title = 'Tech Summit 2026' AND u.email = 'user2@test.com'
    UNION ALL
    SELECT e.id, u.id, 'PENDING'::registration_status, 1500000, 0, 1500000, NULL
    FROM e, u
    WHERE e.title = 'Summer Music Festival 2026' AND u.email = 'user2@test.com'
    RETURNING id, event_id, attendee_id
)
-- ============================================================================
-- TICKETS
-- ============================================================================
, tk AS (
    INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
    SELECT r.id, tt.id, 'TKT-VIP-0001', 'ACTIVE'::ticket_status, 'Nguyen Van A', 'attendee@test.com'
    FROM r, tt, u
    WHERE tt.name = 'VIP'
      AND r.event_id = tt.event_id
      AND r.attendee_id = u.id AND u.email = 'attendee@test.com'
      AND EXISTS (SELECT 1 FROM e WHERE e.id = r.event_id AND e.title = 'Tech Summit 2026')
    UNION ALL
    SELECT r.id, tt.id, 'TKT-REG-0001', 'ACTIVE'::ticket_status, 'Nguyen Van A', 'attendee@test.com'
    FROM r, tt, u
    WHERE tt.name = 'Regular'
      AND r.event_id = tt.event_id
      AND r.attendee_id = u.id AND u.email = 'attendee@test.com'
      AND EXISTS (SELECT 1 FROM e WHERE e.id = r.event_id AND e.title = 'Tech Summit 2026')
    UNION ALL
    SELECT r.id, tt.id, 'TKT-STD-0001', 'ACTIVE'::ticket_status, 'Nguyen Van A', 'attendee@test.com'
    FROM r, tt, u
    WHERE tt.name = 'Standard'
      AND r.event_id = tt.event_id
      AND r.attendee_id = u.id AND u.email = 'attendee@test.com'
      AND EXISTS (SELECT 1 FROM e WHERE e.id = r.event_id AND e.title = 'Summer Music Festival 2026')
    UNION ALL
    SELECT r.id, tt.id, 'TKT-REG-0002', 'ACTIVE'::ticket_status, 'User Two', 'user2@test.com'
    FROM r, tt, u
    WHERE tt.name = 'Regular'
      AND r.event_id = tt.event_id
      AND r.attendee_id = u.id AND u.email = 'user2@test.com'
      AND EXISTS (SELECT 1 FROM e WHERE e.id = r.event_id AND e.title = 'Tech Summit 2026')
    RETURNING id, ticket_code, registration_id
)
-- ============================================================================
-- QR CODES
-- ============================================================================
, q AS (
    INSERT INTO qr_codes (ticket_id, token)
    SELECT tk.id, 'QR-SEED-' || SUBSTRING(REPLACE(gen_random_uuid()::text, '-', '') FROM 1 FOR 16)
    FROM tk
    RETURNING id
)
-- ============================================================================
-- TRANSACTIONS
-- ============================================================================
, txn AS (
    INSERT INTO transactions (user_id, event_id, registration_id, type, status, amount, fee, payment_method, description)
    SELECT u.id, e.id, r.id, 'TICKET_SALE'::transaction_type, 'SUCCESS'::transaction_status, 700000, 35000, 'MOCK', 'Tech Summit 2026 - VIP + Regular'
    FROM u, e, r
    WHERE u.email = 'attendee@test.com'
      AND e.title = 'Tech Summit 2026'
      AND r.attendee_id = u.id AND r.event_id = e.id
    UNION ALL
    SELECT u.id, e.id, r.id, 'TICKET_SALE'::transaction_type, 'SUCCESS'::transaction_status, 300000, 15000, 'MOCK', 'Summer Music Festival 2026 - Standard'
    FROM u, e, r
    WHERE u.email = 'attendee@test.com'
      AND e.title = 'Summer Music Festival 2026'
      AND r.attendee_id = u.id AND r.event_id = e.id
    UNION ALL
    SELECT u.id, e.id, r.id, 'TICKET_SALE'::transaction_type, 'SUCCESS'::transaction_status, 200000, 10000, 'VNPAY', 'Tech Summit 2026 - Regular'
    FROM u, e, r
    WHERE u.email = 'user2@test.com'
      AND e.title = 'Tech Summit 2026'
      AND r.attendee_id = u.id AND r.event_id = e.id
    UNION ALL
    SELECT u.id, e.id, NULL, 'PLATFORM_FEE'::transaction_type, 'SUCCESS'::transaction_status, 60000, 0, 'SYSTEM', 'Phí nền tảng - Tech Summit 2026'
    FROM u, e
    WHERE u.email = 'organizer@test.com'
      AND e.title = 'Tech Summit 2026'
    RETURNING id
)
-- ============================================================================
-- WITHDRAWAL REQUESTS
-- ============================================================================
, w AS (
    INSERT INTO withdrawal_requests (organizer_id, amount, bank_name, bank_account, account_owner, status, requested_at, processed_at)
    SELECT id, 5000000, 'Vietcombank', '1234567890', 'Nguyễn Văn A', 'COMPLETED'::withdrawal_status,
           NOW() - INTERVAL '10 days', NOW() - INTERVAL '8 days'
    FROM u WHERE email = 'organizer@test.com'
    UNION ALL
    SELECT id, 2000000, 'Techcombank', '0987654321', 'Nguyễn Văn A', 'PENDING'::withdrawal_status,
           NOW() - INTERVAL '2 days', NULL
    FROM u WHERE email = 'organizer@test.com'
    RETURNING id
)
-- ============================================================================
-- INVITATIONS
-- ============================================================================
, i AS (
    INSERT INTO invitations (event_id, invited_by, email, token, status, responded_at)
    SELECT e.id, u.id, 'invited1@test.com',
           REPLACE(gen_random_uuid()::text, '-', ''),
           'PENDING'::invite_status, NULL
    FROM e, u
    WHERE e.title = 'Tech Summit 2026' AND u.email = 'organizer@test.com'
    UNION ALL
    SELECT e.id, u.id, 'invited2@test.com',
           REPLACE(gen_random_uuid()::text, '-', ''),
           'ACCEPTED'::invite_status, NOW() - INTERVAL '1 day'
    FROM e, u
    WHERE e.title = 'Tech Summit 2026' AND u.email = 'organizer@test.com'
    RETURNING id
)
-- ============================================================================
-- EVENT TEMPLATES
-- ============================================================================
INSERT INTO event_templates (organizer_id, name, description, category, venue, address, city, tags)
SELECT id, 'Hội nghị công nghệ', 'Template cho sự kiện công nghệ', 'TECH'::event_category,
       'Hội trường', '123 Nguyễn Huệ', 'Hồ Chí Minh', ARRAY['tech', 'hội thảo']
FROM u WHERE email = 'organizer@test.com'
UNION ALL
SELECT id, 'Lễ hội âm nhạc', 'Template cho sự kiện âm nhạc ngoài trời', 'MUSIC'::event_category,
       'Sân khấu ngoài trời', '456 Trần Hưng Đạo', 'Đà Nẵng', ARRAY['music', 'festival']
FROM u WHERE email = 'organizer@test.com';

-- ============================================================================
-- BULK DATA GENERATION FOR LOAD TESTING & REALISTIC DEMO
-- ============================================================================

DO $$
DECLARE
    v_organizer_id UUID;
    v_event_id UUID;
    v_attendee_id UUID;
    v_registration_id UUID;
    v_ticket_id UUID;
    v_tt_early UUID;
    v_tt_standard UUID;
    v_tt_vip UUID;
    i INT;
    j INT;
    random_cat VARCHAR;
    random_status VARCHAR;
    random_city VARCHAR;
BEGIN
    -- Lấy ID của Organizer chính
    SELECT id INTO v_organizer_id FROM users WHERE email = 'organizer@prestigeplanner.com' LIMIT 1;
    
    -- 1. Tạo 50 Attendees tự động
    FOR i IN 1..50 LOOP
        INSERT INTO users (email, password_hash, role, is_verified, is_active)
        VALUES ('attendee_' || i || '@prestigeplanner.com', crypt('password123', gen_salt('bf')), 'ATTENDEE', TRUE, TRUE)
        RETURNING id INTO v_attendee_id;
        
        INSERT INTO attendee_profiles (user_id, display_name, phone, avatar_url, date_of_birth, address)
        VALUES (v_attendee_id, 'Khách mời ' || i, '09' || lpad((floor(random()*100000000))::text, 8, '0'), 'https://i.pravatar.cc/150?u=' || v_attendee_id, '1990-01-01'::date, 'Việt Nam');
    END LOOP;

    -- 2. Tạo 30 Events đa dạng
    FOR i IN 1..30 LOOP
        random_cat := (ARRAY['MUSIC', 'TECH', 'BUSINESS', 'EDUCATION', 'SPORTS', 'ART'])[floor(random() * 6 + 1)::int];
        random_status := (ARRAY['PUBLISHED', 'PUBLISHED', 'PUBLISHED', 'DRAFT', 'COMPLETED', 'CANCELLED'])[floor(random() * 6 + 1)::int];
        random_city := (ARRAY['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'])[floor(random() * 5 + 1)::int];
        
        INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, registration_deadline, max_attendees, banner_url, thumbnail_url, is_featured)
        VALUES (
            v_organizer_id,
            'Sự kiện Hoành tráng số ' || i || ' - ' || random_cat,
            'su-kien-hoanh-trang-' || i,
            'Đây là nội dung mô tả chi tiết cho sự kiện hoành tráng số ' || i || '. Sự kiện này được tự động tạo ra để kiểm thử hệ thống với đầy đủ thông tin, diễn giả và nhiều loại vé khác nhau.',
            'Sự kiện demo ' || i,
            random_cat::event_category,
            random_status::event_status,
            'Trung tâm Hội nghị ' || random_city,
            'Số ' || floor(random() * 999 + 1) || ' Đường Demo',
            random_city,
            NOW() + (i || ' days')::interval, 
            NOW() + (i || ' days 4 hours')::interval,
            NOW() + ((i - 2) || ' days')::interval,
            floor(random()*2000 + 100)::int,
            'https://images.unsplash.com/photo-' || (1500000000000 + i * 1000) || '?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-' || (1500000000000 + i * 1000) || '?auto=format&fit=crop&q=80&w=400',
            (random() > 0.8)
        ) RETURNING id INTO v_event_id;

        -- 3. Tạo 3 loại vé cho mỗi sự kiện
        INSERT INTO ticket_types (event_id, name, description, price, total_quantity, sold_quantity, max_per_order, sale_start_date, sale_end_date, is_active)
        VALUES (v_event_id, 'Early Bird', 'Vé mua sớm ưu đãi', 150000, 50, 0, 5, NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', TRUE) RETURNING id INTO v_tt_early;
        
        INSERT INTO ticket_types (event_id, name, description, price, total_quantity, sold_quantity, max_per_order, sale_start_date, sale_end_date, is_active)
        VALUES (v_event_id, 'Standard', 'Vé tiêu chuẩn', 300000, 500, 0, 10, NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', TRUE) RETURNING id INTO v_tt_standard;
        
        INSERT INTO ticket_types (event_id, name, description, price, total_quantity, sold_quantity, max_per_order, sale_start_date, sale_end_date, is_active)
        VALUES (v_event_id, 'VIP', 'Vé VIP kèm quà tặng', 1000000, 50, 0, 2, NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', TRUE) RETURNING id INTO v_tt_vip;

        -- 4. Tạo random 5 - 15 lượt đăng ký và mua vé cho mỗi sự kiện đã PUBLISHED
        IF random_status = 'PUBLISHED' THEN
            FOR v_attendee_id IN 
                SELECT id FROM users WHERE email LIKE 'attendee_%@prestigeplanner.com' ORDER BY random() LIMIT floor(random() * 10 + 5)::int 
            LOOP
                -- Tạo 1 đăng ký (Registration)
                INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at)
                VALUES (v_event_id, v_attendee_id, 'CONFIRMED', 300000, 0, 300000, NOW() - (random() * interval '5 days'))
                RETURNING id INTO v_registration_id;

                -- Tạo 1 vé (Ticket)
                INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
                VALUES (v_registration_id, v_tt_standard, 'TKT-AUTO-' || substring(md5(random()::text) from 1 for 8), 'ACTIVE', 'Khách Demo', 'attendee@prestigeplanner.com')
                RETURNING id INTO v_ticket_id;

                -- Tạo mã QR cho vé
                INSERT INTO qr_codes (ticket_id, token)
                VALUES (v_ticket_id, 'QR-SEED-' || substring(md5(random()::text) from 1 for 16));

                -- Tạo giao dịch (Transaction)
                INSERT INTO transactions (user_id, event_id, registration_id, type, status, amount, fee, payment_method, description)
                VALUES (v_attendee_id, v_event_id, v_registration_id, 'TICKET_SALE', 'SUCCESS', 300000, 15000, 'VNPAY', 'Mua vé tự động');
                
                -- Tăng số lượng vé đã bán
                UPDATE ticket_types SET sold_quantity = sold_quantity + 1 WHERE id = v_tt_standard;
            END LOOP;
        END IF;
    END LOOP;
END $$;
