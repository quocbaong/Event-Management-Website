-- V16: Seed dữ liệu hoành tráng (Sự kiện, Khách mời, Doanh thu) cho nbao76296@gmail.com năm 2026 (Jan - May)

DO $$
DECLARE
    v_organizer_id UUID;
    v_event_id UUID;
    v_tt_vip UUID;
    v_tt_std UUID;
    v_tt_stu UUID;
    v_attendee_id UUID;
    v_registration_id UUID;
    v_ticket_id UUID;
    
    -- Mảng dữ liệu sự kiện
    ev_titles TEXT[] := ARRAY[
        'Prestige Tech Talk 2026', 
        'Le hoi Mua xuan Acoustic', 
        'Workshop Master Class: Design System',
        'Hoi thao Startup & Venture Capital',
        'Dem nhac Jazz duoi anh trang',
        'Marathon vi Tre em Ngheo 2026',
        'Trien lam Tranh Son Dau: Sac Xuan',
        'Hoi nghi Tri Tue Nhan Tao & Robotics'
    ];
    ev_categories TEXT[] := ARRAY['TECH', 'MUSIC', 'ART', 'BUSINESS', 'MUSIC', 'SPORTS', 'ART', 'TECH'];
    ev_dates TIMESTAMP[] := ARRAY[
        '2026-01-18 09:00:00'::timestamp,
        '2026-02-14 19:30:00'::timestamp,
        '2026-02-28 13:30:00'::timestamp,
        '2026-03-10 08:30:00'::timestamp,
        '2026-03-28 20:00:00'::timestamp,
        '2026-04-12 05:30:00'::timestamp,
        '2026-04-25 09:00:00'::timestamp,
        '2026-05-15 08:00:00'::timestamp
    ];
    ev_venues TEXT[] := ARRAY[
        'Bach Khoa Innovation Space',
        'Phong tra Lululola',
        'Standard Creative Hub',
        'Khach san JW Marriott',
        'Nha hat Lon Ha Noi',
        'Cong vien Thong Nhat',
        'Bao tang My thuat Viet Nam',
        'SECC - Trung tam Trien lam Sai Gon'
    ];
    ev_cities TEXT[] := ARRAY['Ho Chi Minh', 'Ha Noi', 'Da Nang', 'Ha Noi', 'Ha Noi', 'Ha Noi', 'Ha Noi', 'Ho Chi Minh'];
    
    i INT;
    j INT;
    v_price_vip INT;
    v_price_std INT;
    v_price_stu INT;
    
    v_rand_day INT;
    v_rand_hour INT;
    v_order_date TIMESTAMP;
    v_ticket_qty INT;
    v_unit_price INT;
    v_final_amount INT;
    
    v_total_revenue NUMERIC;
    r_attendee RECORD;
BEGIN
    -- 1. Tìm hoặc tạo user nbao76296@gmail.com
    SELECT id INTO v_organizer_id FROM users WHERE email = 'nbao76296@gmail.com';
    IF v_organizer_id IS NULL THEN
        INSERT INTO users (email, password_hash, role, is_verified, is_active)
        VALUES ('nbao76296@gmail.com', crypt('Quocbao106.', gen_salt('bf')), 'ORGANIZER', TRUE, TRUE)
        RETURNING id INTO v_organizer_id;

        INSERT INTO organizer_profiles (user_id, company_name, phone, bio, is_verified)
        VALUES (v_organizer_id, 'Nbao Entertainment', '0901234567', 'Chuyen gia to chuc su kien hang dau', TRUE);
    END IF;

    -- 2. Tạo 30 Khách mời (Attendees) độc quyền cho tài khoản nbao
    FOR j IN 1..30 LOOP
        SELECT id INTO v_attendee_id FROM users WHERE email = 'nbao_guest_' || j || '@gmail.com';
        IF v_attendee_id IS NULL THEN
            INSERT INTO users (email, password_hash, role, is_verified, is_active)
            VALUES ('nbao_guest_' || j || '@gmail.com', crypt('password123', gen_salt('bf')), 'ATTENDEE', TRUE, TRUE)
            RETURNING id INTO v_attendee_id;
            
            INSERT INTO attendee_profiles (user_id, display_name, phone, avatar_url, date_of_birth, address)
            VALUES (
                v_attendee_id, 
                'Khach Moi Vip ' || j, 
                '09' || lpad((floor(random()*100000000))::text, 8, '0'), 
                'https://i.pravatar.cc/150?u=' || v_attendee_id, 
                '1995-05-15'::date, 
                'Ha Noi'
            );
        END IF;
    END LOOP;

    -- 3. Tạo các Sự kiện, Loại vé, Lượt đăng ký và Hoá đơn
    FOR i IN 1..8 LOOP
        -- Thêm Sự kiện
        INSERT INTO events (organizer_id, title, slug, description, short_desc, category, status, venue, address, city, start_date, end_date, max_attendees, banner_url)
        VALUES (
            v_organizer_id, 
            ev_titles[i], 
            LOWER(REPLACE(REPLACE(ev_titles[i], ' ', '-'), ':', '')) || '-' || extract(epoch from now()) || '-' || i, 
            'Chao mung den voi ' || ev_titles[i] || '. Su kien chuyen nghiep duoc thiet ke voi chuan muc cao nhat nham dem lai trai nghiem giao luu, chia se ky nang va mo rong mang luoi quan he.',
            'Su kien cao cap tu Nbao', 
            ev_categories[i]::event_category, 
            'PUBLISHED', 
            ev_venues[i], 
            'So ' || (floor(random() * 200) + 1) || ' Pho Trung Tam', 
            ev_cities[i], 
            ev_dates[i], 
            ev_dates[i] + INTERVAL '4 hours', 
            1000, 
            'https://images.unsplash.com/photo-' || (1500000000000 + i * 20000) || '?w=800'
        )
        RETURNING id INTO v_event_id;

        -- Thiết lập giá vé ngẫu nhiên theo sự kiện
        v_price_vip := 1000000 + (i * 100000);
        v_price_std := 400000 + (i * 50000);
        v_price_stu := 200000 + (i * 20000);

        -- Thêm 3 Loại vé
        INSERT INTO ticket_types (event_id, name, description, price, total_quantity, sold_quantity, max_per_order, sale_start_date, sale_end_date, is_active)
        VALUES (v_event_id, 'VIP', 'Ve VIP kem dich vu thuong hang', v_price_vip, 100, 0, 2, ev_dates[i] - INTERVAL '30 days', ev_dates[i] - INTERVAL '1 day', TRUE)
        RETURNING id INTO v_tt_vip;

        INSERT INTO ticket_types (event_id, name, description, price, total_quantity, sold_quantity, max_per_order, sale_start_date, sale_end_date, is_active)
        VALUES (v_event_id, 'Standard', 'Ve tieu chuan thong thuong', v_price_std, 500, 0, 10, ev_dates[i] - INTERVAL '30 days', ev_dates[i] - INTERVAL '1 day', TRUE)
        RETURNING id INTO v_tt_std;

        INSERT INTO ticket_types (event_id, name, description, price, total_quantity, sold_quantity, max_per_order, sale_start_date, sale_end_date, is_active)
        VALUES (v_event_id, 'Student', 'Ve uu dai danh cho hoc sinh, sinh vien', v_price_stu, 200, 0, 5, ev_dates[i] - INTERVAL '30 days', ev_dates[i] - INTERVAL '1 day', TRUE)
        RETURNING id INTO v_tt_stu;

        -- Tạo 20 lượt đăng ký ngẫu nhiên không trùng lặp cho mỗi sự kiện
        j := 0;
        FOR r_attendee IN (
            SELECT id FROM users 
            WHERE email LIKE 'nbao_guest_%' 
            ORDER BY random() 
            LIMIT 20
        ) LOOP
            j := j + 1;
            v_attendee_id := r_attendee.id;
            
            -- Tính ngày đặt vé (10 đến 2 ngày trước sự kiện)
            v_rand_day := floor(random() * 8) + 2;
            v_rand_hour := floor(random() * 12) + 8;
            v_order_date := ev_dates[i] - (v_rand_day || ' days')::interval + (v_rand_hour || ' hours')::interval;

            -- Loại vé ngẫu nhiên (VIP, Standard, Student)
            IF random() > 0.75 THEN
                v_unit_price := v_price_vip;
                v_ticket_id := v_tt_vip;
            ELSIF random() > 0.3 THEN
                v_unit_price := v_price_std;
                v_ticket_id := v_tt_std;
            ELSE
                v_unit_price := v_price_stu;
                v_ticket_id := v_tt_stu;
            END IF;

            -- Số lượng vé (1 hoặc 2)
            v_ticket_qty := floor(random() * 2) + 1;
            v_final_amount := v_unit_price * v_ticket_qty;

            -- Tạo Đăng ký
            INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at, created_at, updated_at)
            VALUES (v_event_id, v_attendee_id, 'CONFIRMED', v_final_amount, 0, v_final_amount, v_order_date, v_order_date, v_order_date)
            RETURNING id INTO v_registration_id;

            -- Tạo Vé
            FOR k IN 1..v_ticket_qty LOOP
                INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email)
                VALUES (
                    v_registration_id, 
                    v_ticket_id, 
                    'TKT-AUTO-' || substring(md5(random()::text) from 1 for 12), 
                    'ACTIVE', 
                    'Khach Moi Doc Quyen', 
                    'guest' || j || '@gmail.com'
                );
            END LOOP;

            -- Tạo Giao dịch
            INSERT INTO transactions (user_id, event_id, registration_id, type, status, amount, fee, payment_method, description, created_at, updated_at)
            VALUES (
                v_attendee_id, 
                v_event_id, 
                v_registration_id, 
                'TICKET_SALE', 
                'SUCCESS', 
                v_final_amount, 
                v_final_amount * 0.05, 
                (ARRAY['VNPAY', 'MOCK', 'MOCK'])[floor(random() * 3 + 1)::int], 
                'Mua ve ' || ev_titles[i] || ' tai Prestige Planner', 
                v_order_date, 
                v_order_date
            );

            -- Cập nhật số lượng vé đã bán
            UPDATE ticket_types SET sold_quantity = sold_quantity + v_ticket_qty WHERE id = v_ticket_id;
        END LOOP;
    END LOOP;

    -- 4. Đồng bộ tổng doanh thu và số dư cho nbao76296@gmail.com
    SELECT COALESCE(SUM(r.final_amount), 0) INTO v_total_revenue
    FROM registrations r
    JOIN events e ON r.event_id = e.id
    WHERE e.organizer_id = v_organizer_id AND r.status = 'CONFIRMED';
    
    UPDATE organizer_profiles 
    SET total_revenue = v_total_revenue, 
        available_balance = v_total_revenue * 0.95
    WHERE user_id = v_organizer_id;

END $$;
