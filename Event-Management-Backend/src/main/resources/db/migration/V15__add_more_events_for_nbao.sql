-- V15: Thêm nhiều sự kiện giả lập rải đều năm 2026 cho nbao76296@gmail.com

DO $$
DECLARE
    v_user_id UUID;
    v_event_id UUID;
    v_ticket_id UUID;
    v_attendee_id UUID;
    v_registration_id UUID;
BEGIN
    -- 1. Tìm hoặc tạo user nbao76296@gmail.com
    SELECT id INTO v_user_id FROM users WHERE email = 'nbao76296@gmail.com';
    IF v_user_id IS NULL THEN
        INSERT INTO users (email, password_hash, role, is_verified, is_active)
        VALUES ('nbao76296@gmail.com', crypt('Quocbao106.', gen_salt('bf')), 'ORGANIZER', TRUE, TRUE)
        RETURNING id INTO v_user_id;

        INSERT INTO organizer_profiles (user_id, company_name, phone, bio, is_verified)
        VALUES (v_user_id, 'Nbao Entertainment', '0901234567', 'Chuyên gia tổ chức sự kiện hàng đầu', TRUE);
    END IF;

    -- Lấy một attendee để mua vé
    SELECT id INTO v_attendee_id FROM users WHERE email = 'attendee@test.com';
    IF v_attendee_id IS NULL THEN
        INSERT INTO users (email, password_hash, role, is_verified, is_active)
        VALUES ('attendee@test.com', crypt('password123', gen_salt('bf')), 'ATTENDEE', TRUE, TRUE)
        RETURNING id INTO v_attendee_id;
    END IF;

    -- 2. Sinh dữ liệu sự kiện rải đều 2026

    -- ==========================================
    -- SỰ KIỆN 1: THÁNG 1 (15 vé VIP x 1,000,000)
    -- ==========================================
    INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, max_attendees, banner_url)
    VALUES (v_user_id, 'Lễ hội công nghệ mùa xuân', 'spring-tech-2026-' || extract(epoch from now()), 'Mở màn năm mới bằng công nghệ tiên tiến', 'Tech festival', 'TECH', 'PUBLISHED', 'SECC - Trung tâm Hội chợ Triển lãm', '799 Nguyễn Văn Linh', 'Hồ Chí Minh', '2026-01-15 08:00:00', '2026-01-16 17:00:00', 500, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800')
    RETURNING id INTO v_event_id;

    INSERT INTO ticket_types (event_id, name, price, total_quantity, sold_quantity, sale_start_date, sale_end_date)
    VALUES (v_event_id, 'VIP', 1000000, 100, 15, '2025-12-01', '2026-01-14') RETURNING id INTO v_ticket_id;

    INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at, created_at, updated_at)
    VALUES (v_event_id, v_attendee_id, 'CONFIRMED', 15000000, 0, 15000000, '2026-01-05 10:00:00', '2026-01-05 10:00:00', '2026-01-05 10:00:00')
    RETURNING id INTO v_registration_id;
    
    FOR j IN 1..15 LOOP
        INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
        VALUES (v_registration_id, v_ticket_id, 'TKT-AUTO-' || gen_random_uuid(), 'ACTIVE', 'Auto Attendee ' || j, 'attendee' || j || '@test.com');
    END LOOP;

    -- ==========================================
    -- SỰ KIỆN 2: THÁNG 3 (40 vé Standard x 500,000)
    -- ==========================================
    INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, max_attendees, banner_url)
    VALUES (v_user_id, 'Hội thảo kinh doanh toàn cầu', 'business-march-2026-' || extract(epoch from now()), 'Kết nối doanh nghiệp 2026', 'Business connect', 'BUSINESS', 'PUBLISHED', 'Khách sạn JW Marriott', 'Đỗ Đức Dục', 'Hà Nội', '2026-03-10 09:00:00', '2026-03-10 17:00:00', 300, 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=800')
    RETURNING id INTO v_event_id;

    INSERT INTO ticket_types (event_id, name, price, total_quantity, sold_quantity, sale_start_date, sale_end_date)
    VALUES (v_event_id, 'Standard', 500000, 200, 40, '2026-02-01', '2026-03-09') RETURNING id INTO v_ticket_id;

    INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at, created_at, updated_at)
    VALUES (v_event_id, v_attendee_id, 'CONFIRMED', 20000000, 0, 20000000, '2026-02-15 10:00:00', '2026-02-15 10:00:00', '2026-02-15 10:00:00')
    RETURNING id INTO v_registration_id;

    FOR j IN 1..40 LOOP
        INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
        VALUES (v_registration_id, v_ticket_id, 'TKT-AUTO-' || gen_random_uuid(), 'ACTIVE', 'Auto Attendee ' || j, 'attendee' || j || '@test.com');
    END LOOP;

    -- ==========================================
    -- SỰ KIỆN 3: THÁNG 5 (120 vé Vào cửa x 200,000)
    -- ==========================================
    INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, max_attendees, banner_url)
    VALUES (v_user_id, 'Triển lãm nghệ thuật đương đại', 'art-may-2026-' || extract(epoch from now()), 'Trưng bày tác phẩm nghệ thuật', 'Art expo', 'ART', 'PUBLISHED', 'Bảo tàng Mỹ thuật', '66 Nguyễn Thái Học', 'Hà Nội', '2026-05-20 09:00:00', '2026-05-25 17:00:00', 1000, 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800')
    RETURNING id INTO v_event_id;

    INSERT INTO ticket_types (event_id, name, price, total_quantity, sold_quantity, sale_start_date, sale_end_date)
    VALUES (v_event_id, 'Vào cửa', 200000, 1000, 120, '2026-04-01', '2026-05-19') RETURNING id INTO v_ticket_id;

    INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at, created_at, updated_at)
    VALUES (v_event_id, v_attendee_id, 'CONFIRMED', 24000000, 0, 24000000, '2026-04-20 10:00:00', '2026-04-20 10:00:00', '2026-04-20 10:00:00')
    RETURNING id INTO v_registration_id;

    FOR j IN 1..120 LOOP
        INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
        VALUES (v_registration_id, v_ticket_id, 'TKT-AUTO-' || gen_random_uuid(), 'ACTIVE', 'Auto Attendee ' || j, 'attendee' || j || '@test.com');
    END LOOP;

    -- ==========================================
    -- SỰ KIỆN 4: THÁNG 7 (800 vé General x 300,000)
    -- ==========================================
    INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, max_attendees, banner_url)
    VALUES (v_user_id, 'Lễ hội âm nhạc mùa hè xập xình', 'summer-music-july-' || extract(epoch from now()), 'Đại nhạc hội bãi biển', 'Summer beat', 'MUSIC', 'PUBLISHED', 'Sân vận động Mỹ Đình', 'Đường Lê Đức Thọ', 'Hà Nội', '2026-07-15 18:00:00', '2026-07-15 23:00:00', 5000, 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800')
    RETURNING id INTO v_event_id;

    INSERT INTO ticket_types (event_id, name, price, total_quantity, sold_quantity, sale_start_date, sale_end_date)
    VALUES (v_event_id, 'General', 300000, 4000, 800, '2026-05-01', '2026-07-14') RETURNING id INTO v_ticket_id;

    INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at, created_at, updated_at)
    VALUES (v_event_id, v_attendee_id, 'CONFIRMED', 240000000, 0, 240000000, '2026-06-10 10:00:00', '2026-06-10 10:00:00', '2026-06-10 10:00:00')
    RETURNING id INTO v_registration_id;

    FOR j IN 1..800 LOOP
        INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
        VALUES (v_registration_id, v_ticket_id, 'TKT-AUTO-' || gen_random_uuid(), 'ACTIVE', 'Auto Attendee ' || j, 'attendee' || j || '@test.com');
    END LOOP;

    -- ==========================================
    -- SỰ KIỆN 5: THÁNG 9 (60 vé Standard x 800,000)
    -- ==========================================
    INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, max_attendees, banner_url)
    VALUES (v_user_id, 'Hội thảo AI & Tương lai', 'ai-sept-2026-' || extract(epoch from now()), 'AI trend và ứng dụng', 'AI trend', 'TECH', 'PUBLISHED', 'Đại học Bách Khoa', '1 Đại Cồ Việt', 'Hà Nội', '2026-09-05 08:00:00', '2026-09-06 17:00:00', 500, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800')
    RETURNING id INTO v_event_id;

    INSERT INTO ticket_types (event_id, name, price, total_quantity, sold_quantity, sale_start_date, sale_end_date)
    VALUES (v_event_id, 'Standard', 800000, 500, 60, '2026-07-01', '2026-09-04') RETURNING id INTO v_ticket_id;

    INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at, created_at, updated_at)
    VALUES (v_event_id, v_attendee_id, 'CONFIRMED', 48000000, 0, 48000000, '2026-08-01 10:00:00', '2026-08-01 10:00:00', '2026-08-01 10:00:00')
    RETURNING id INTO v_registration_id;

    FOR j IN 1..60 LOOP
        INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
        VALUES (v_registration_id, v_ticket_id, 'TKT-AUTO-' || gen_random_uuid(), 'ACTIVE', 'Auto Attendee ' || j, 'attendee' || j || '@test.com');
    END LOOP;

    -- ==========================================
    -- SỰ KIỆN 6: THÁNG 10 (80 vé Standard x 150,000)
    -- ==========================================
    INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, max_attendees, banner_url)
    VALUES (v_user_id, 'Workshop Kỹ năng mềm', 'soft-skill-oct-' || extract(epoch from now()), 'Kỹ năng giao tiếp', 'Soft skills', 'EDUCATION', 'PUBLISHED', 'Trung tâm Hội nghị', 'Quận 1', 'Hồ Chí Minh', '2026-10-12 14:00:00', '2026-10-12 17:00:00', 100, 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800')
    RETURNING id INTO v_event_id;

    INSERT INTO ticket_types (event_id, name, price, total_quantity, sold_quantity, sale_start_date, sale_end_date)
    VALUES (v_event_id, 'Standard', 150000, 100, 80, '2026-09-01', '2026-10-11') RETURNING id INTO v_ticket_id;

    INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at, created_at, updated_at)
    VALUES (v_event_id, v_attendee_id, 'CONFIRMED', 12000000, 0, 12000000, '2026-09-15 10:00:00', '2026-09-15 10:00:00', '2026-09-15 10:00:00')
    RETURNING id INTO v_registration_id;

    FOR j IN 1..80 LOOP
        INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
        VALUES (v_registration_id, v_ticket_id, 'TKT-AUTO-' || gen_random_uuid(), 'ACTIVE', 'Auto Attendee ' || j, 'attendee' || j || '@test.com');
    END LOOP;

    -- ==========================================
    -- SỰ KIỆN 7: THÁNG 11 (500 vé Runner x 400,000)
    -- ==========================================
    INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, max_attendees, banner_url)
    VALUES (v_user_id, 'Giải chạy bộ Marathon Hành tinh xanh', 'marathon-nov-' || extract(epoch from now()), 'Marathon vì sức khỏe cộng đồng', 'Marathon', 'SPORTS', 'PUBLISHED', 'Phố đi bộ Nguyễn Huệ', 'Quận 1', 'Hồ Chí Minh', '2026-11-20 05:00:00', '2026-11-20 12:00:00', 2000, 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800')
    RETURNING id INTO v_event_id;

    INSERT INTO ticket_types (event_id, name, price, total_quantity, sold_quantity, sale_start_date, sale_end_date)
    VALUES (v_event_id, 'Runner', 400000, 2000, 500, '2026-09-01', '2026-11-10') RETURNING id INTO v_ticket_id;

    INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at, created_at, updated_at)
    VALUES (v_event_id, v_attendee_id, 'CONFIRMED', 200000000, 0, 200000000, '2026-10-01 10:00:00', '2026-10-01 10:00:00', '2026-10-01 10:00:00')
    RETURNING id INTO v_registration_id;

    FOR j IN 1..500 LOOP
        INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
        VALUES (v_registration_id, v_ticket_id, 'TKT-AUTO-' || gen_random_uuid(), 'ACTIVE', 'Auto Attendee ' || j, 'attendee' || j || '@test.com');
    END LOOP;

    -- ==========================================
    -- SỰ KIỆN 8: THÁNG 12 (250 vé VIP x 1,200,000)
    -- ==========================================
    INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, max_attendees, banner_url)
    VALUES (v_user_id, 'Gala Tỏa Sáng Cuối Năm', 'gala-dec-2026-' || extract(epoch from now()), 'Year end party hoành tráng', 'YEP', 'ENTERTAINMENT', 'PUBLISHED', 'Trung tâm GEM Center', 'Nguyễn Bỉnh Khiêm', 'Hồ Chí Minh', '2026-12-25 18:00:00', '2026-12-25 23:00:00', 300, 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800')
    RETURNING id INTO v_event_id;

    INSERT INTO ticket_types (event_id, name, price, total_quantity, sold_quantity, sale_start_date, sale_end_date)
    VALUES (v_event_id, 'VIP', 1200000, 300, 250, '2026-11-01', '2026-12-20') RETURNING id INTO v_ticket_id;

    INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at, created_at, updated_at)
    VALUES (v_event_id, v_attendee_id, 'CONFIRMED', 300000000, 0, 300000000, '2026-11-15 10:00:00', '2026-11-15 10:00:00', '2026-11-15 10:00:00')
    RETURNING id INTO v_registration_id;

    FOR j IN 1..250 LOOP
        INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
        VALUES (v_registration_id, v_ticket_id, 'TKT-AUTO-' || gen_random_uuid(), 'ACTIVE', 'Auto Attendee ' || j, 'attendee' || j || '@test.com');
    END LOOP;

END $$;
