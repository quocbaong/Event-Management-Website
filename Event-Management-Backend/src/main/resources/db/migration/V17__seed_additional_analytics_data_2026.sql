-- V17: Bổ sung dữ liệu phân tích chuyên sâu (Check-in, Khách mời đa dạng độ tuổi, Giao dịch) cho nbao76296@gmail.com (Tháng 4 - Tháng 5/2026)

DO $$
DECLARE
    v_organizer_id UUID;
    v_event_id UUID;
    v_attendee_id UUID;
    v_registration_id UUID;
    v_ticket_id UUID;
    
    r_event RECORD;
    r_attendee RECORD;
    r_ticket RECORD;
    
    v_order_date TIMESTAMP;
    v_checkin_date TIMESTAMP;
    v_ticket_qty INT;
    v_unit_price INT;
    v_final_amount INT;
    v_total_revenue NUMERIC;
    
    j INT;
    k INT;
    v_rand_day INT;
    v_rand_hour INT;
BEGIN
    -- 1. Lay organizer_id cua nbao76296@gmail.com
    SELECT id INTO v_organizer_id FROM users WHERE email = 'nbao76296@gmail.com';
    IF v_organizer_id IS NULL THEN
        RETURN;
    END IF;

    -- 2. Tao them 40 Khach moi Attendees moi voi da dang do tuoi
    FOR j IN 31..70 LOOP
        SELECT id INTO v_attendee_id FROM users WHERE email = 'nbao_guest_' || j || '@gmail.com';
        IF v_attendee_id IS NULL THEN
            INSERT INTO users (email, password_hash, role, is_verified, is_active)
            VALUES ('nbao_guest_' || j || '@gmail.com', crypt('password123', gen_salt('bf')), 'ATTENDEE', TRUE, TRUE)
            RETURNING id INTO v_attendee_id;
            
            DECLARE
                v_dob DATE;
            BEGIN
                IF j <= 45 THEN
                    v_dob := '2003-06-15'::date - (floor(random() * 1500) || ' days')::interval;
                ELSIF j <= 60 THEN
                    v_dob := '1995-08-20'::date - (floor(random() * 2000) || ' days')::interval;
                ELSE
                    v_dob := '1982-11-10'::date - (floor(random() * 3000) || ' days')::interval;
                END IF;

                INSERT INTO attendee_profiles (user_id, display_name, phone, avatar_url, date_of_birth, address)
                VALUES (
                    v_attendee_id,
                    'Khach Moi Phien Ban ' || j,
                    '09' || lpad((floor(random()*100000000))::text, 8, '0'),
                    'https://i.pravatar.cc/150?u=' || v_attendee_id,
                    v_dob,
                    (ARRAY['Ha Noi', 'Ho Chi Minh', 'Da Nang', 'Can Tho'])[floor(random() * 4 + 1)::int]
                );
            END;
        END IF;
    END LOOP;

    -- 3. Bo sung Dang ky va Ve cho cac su kien tu thang 3/2026
    FOR r_event IN (
        SELECT id, start_date, title FROM events
        WHERE organizer_id = v_organizer_id AND start_date >= '2026-03-01 00:00:00'::timestamp
        ORDER BY start_date
    ) LOOP
        v_event_id := r_event.id;

        -- Bo qua su kien neu khong co ticket_type
        PERFORM id FROM ticket_types WHERE event_id = v_event_id LIMIT 1;
        IF NOT FOUND THEN
            CONTINUE;
        END IF;

        -- Mo rong tong so luong ve de khong bi gioi han
        UPDATE ticket_types
        SET total_quantity = total_quantity + 500
        WHERE event_id = v_event_id;

        j := 0;
        -- Chi chon attendee CHUA dang ky su kien nay
        FOR r_attendee IN (
            SELECT u.id FROM users u
            WHERE u.email LIKE 'nbao_guest_%'
            AND NOT EXISTS (
                SELECT 1 FROM registrations rr
                WHERE rr.event_id = v_event_id AND rr.attendee_id = u.id
            )
            ORDER BY random()
            LIMIT 25
        ) LOOP
            j := j + 1;
            v_attendee_id := r_attendee.id;
            v_registration_id := NULL;

            -- Chon ticket_type ngau nhien trong su kien
            SELECT id INTO v_ticket_id
            FROM ticket_types
            WHERE event_id = v_event_id
            ORDER BY random()
            LIMIT 1;

            IF v_ticket_id IS NULL THEN
                CONTINUE;
            END IF;

            -- Lay gia ve
            SELECT COALESCE(price::INT, 500000) INTO v_unit_price
            FROM ticket_types WHERE id = v_ticket_id;

            v_rand_day := floor(random() * 24) + 1;
            v_rand_hour := floor(random() * 14) + 7;
            v_order_date := r_event.start_date - (v_rand_day || ' days')::interval + (v_rand_hour || ' hours')::interval;

            v_ticket_qty := floor(random() * 2) + 1;
            v_final_amount := v_unit_price * v_ticket_qty;

            -- Insert Registration - bo qua neu da ton tai (ON CONFLICT DO NOTHING)
            INSERT INTO registrations (event_id, attendee_id, status, total_amount, discount_amount, final_amount, confirmed_at, created_at, updated_at)
            VALUES (v_event_id, v_attendee_id, 'CONFIRMED', v_final_amount, 0, v_final_amount, v_order_date, v_order_date, v_order_date)
            ON CONFLICT ON CONSTRAINT uq_registration DO NOTHING
            RETURNING id INTO v_registration_id;

            -- Neu registration bi skip do conflict, tiep tuc vong lap
            IF v_registration_id IS NULL THEN
                CONTINUE;
            END IF;

            -- Insert Tickets kem thoi gian check-in
            FOR k IN 1..v_ticket_qty LOOP
                v_checkin_date := r_event.start_date - (floor(random() * 180) || ' minutes')::interval;

                INSERT INTO tickets (registration_id, ticket_type_id, ticket_code, status, holder_name, holder_email, checked_in_at)
                VALUES (
                    v_registration_id,
                    v_ticket_id,
                    'TKT-V17-' || substring(md5(random()::text || clock_timestamp()::text) from 1 for 16),
                    'USED',
                    'Khach Moi V17',
                    'v17_guest_' || j || '_' || k || '@gmail.com',
                    v_checkin_date
                );
            END LOOP;

            -- Insert Transaction
            INSERT INTO transactions (user_id, event_id, registration_id, type, status, amount, fee, payment_method, description, created_at, updated_at)
            VALUES (
                v_attendee_id,
                v_event_id,
                v_registration_id,
                'TICKET_SALE',
                'SUCCESS',
                v_final_amount,
                v_final_amount * 0.05,
                (ARRAY['VNPAY', 'MOMO', 'ZALOPAY', 'CREDIT_CARD'])[floor(random() * 4 + 1)::int],
                'Mua ve su kien ' || r_event.title,
                v_order_date,
                v_order_date
            );

            -- Cap nhat sold_quantity (da tang total_quantity nen khong vi pham chk_quantity)
            UPDATE ticket_types SET sold_quantity = sold_quantity + v_ticket_qty WHERE id = v_ticket_id;
        END LOOP;
    END LOOP;

    -- 4. Cap nhat checked_in_at cho 80% cac ve cu chua co check-in
    FOR r_ticket IN (
        SELECT t.id, e.start_date
        FROM tickets t
        JOIN registrations r ON t.registration_id = r.id
        JOIN events e ON r.event_id = e.id
        WHERE e.organizer_id = v_organizer_id AND t.checked_in_at IS NULL AND r.status = 'CONFIRMED'
    ) LOOP
        IF random() < 0.8 THEN
            v_checkin_date := r_ticket.start_date - (floor(random() * 240) || ' minutes')::interval;
            UPDATE tickets
            SET status = 'USED', checked_in_at = v_checkin_date
            WHERE id = r_ticket.id;
        END IF;
    END LOOP;

    -- 5. Dong bo lai tong doanh thu
    SELECT COALESCE(SUM(r.final_amount), 0) INTO v_total_revenue
    FROM registrations r
    JOIN events e ON r.event_id = e.id
    WHERE e.organizer_id = v_organizer_id AND r.status = 'CONFIRMED';

    UPDATE organizer_profiles
    SET total_revenue = v_total_revenue,
        available_balance = v_total_revenue * 0.95
    WHERE user_id = v_organizer_id;

END $$;
