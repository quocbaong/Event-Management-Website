DO $$ 
DECLARE
    org_id UUID;
    u_id UUID;
    evt_id UUID;
    i INT;
    m INT;
    num_events INT;
    base_amount NUMERIC;
    ts TIMESTAMP WITH TIME ZONE;
BEGIN
    SELECT id INTO org_id FROM users WHERE email = 'org2026@test.com' LIMIT 1;
    IF org_id IS NOT NULL THEN
        DELETE FROM transactions t WHERE t.event_id IN (SELECT id FROM events WHERE organizer_id = org_id);
        DELETE FROM tickets tk WHERE tk.ticket_type_id IN (SELECT id FROM ticket_types WHERE event_id IN (SELECT id FROM events WHERE organizer_id = org_id));
        DELETE FROM registrations r WHERE r.event_id IN (SELECT id FROM events WHERE organizer_id = org_id);
        DELETE FROM ticket_types tt WHERE tt.event_id IN (SELECT id FROM events WHERE organizer_id = org_id);
        DELETE FROM event_schedules es WHERE es.event_id IN (SELECT id FROM events WHERE organizer_id = org_id);
        DELETE FROM event_timelines et WHERE et.event_id IN (SELECT id FROM events WHERE organizer_id = org_id);
        DELETE FROM events e WHERE e.organizer_id = org_id;
    END IF;
    
    -- Delete previous attendees from first script and their dependencies
    DELETE FROM transactions t WHERE t.user_id IN (SELECT id FROM users u WHERE u.email LIKE 'user_%@test.com' OR u.email LIKE 'user2026_%');
    DELETE FROM tickets tk WHERE tk.registration_id IN (SELECT id FROM registrations r WHERE r.attendee_id IN (SELECT id FROM users u WHERE u.email LIKE 'user_%@test.com' OR u.email LIKE 'user2026_%'));
    DELETE FROM registrations r WHERE r.attendee_id IN (SELECT id FROM users u WHERE u.email LIKE 'user_%@test.com' OR u.email LIKE 'user2026_%');
    DELETE FROM users u WHERE u.email LIKE 'user_%@test.com' OR u.email LIKE 'user2026_%';

    IF org_id IS NULL THEN
        org_id := gen_random_uuid();
        INSERT INTO users (id, email, password_hash, role, is_active, created_at, updated_at)
        VALUES (org_id, 'org2026@test.com', 'hash', 'ORGANIZER', true, '2026-01-01 00:00:00Z', '2026-01-01 00:00:00Z');
    END IF;

    FOR m IN 1..5 LOOP
        IF m = 1 THEN num_events := 5; base_amount := 500000;
        ELSIF m = 2 THEN num_events := 12; base_amount := 1200000;
        ELSIF m = 3 THEN num_events := 8; base_amount := 800000;
        ELSIF m = 4 THEN num_events := 20; base_amount := 2500000;
        ELSIF m = 5 THEN num_events := 15; base_amount := 1800000;
        END IF;

        FOR i IN 1..num_events LOOP
            u_id := gen_random_uuid();
            ts := ('2026-0' || m || '-' || (i % 28 + 1) || ' 10:00:00Z')::TIMESTAMP WITH TIME ZONE;
            
            INSERT INTO users (id, email, password_hash, role, is_active, created_at, updated_at)
            VALUES (u_id, 'user2026_' || m || '_' || i || '_' || FLOOR(RANDOM() * 100000) || '@test.com', 'hash', 'ATTENDEE', true, ts, ts);
            
            evt_id := gen_random_uuid();
            INSERT INTO events (id, organizer_id, title, slug, description, venue, address, city, category, status, start_date, end_date, current_attendees, max_attendees, is_featured, created_at, updated_at)
            VALUES (
                evt_id, org_id, 'Sự kiện ' || m || '-' || i, 'event-2026-' || m || '-' || i || '-' || FLOOR(RANDOM() * 100000), 'Sự kiện được tạo tự động cho tháng ' || m, 'Venue ' || i, 'Address ' || i, 'Hà Nội',
                CASE WHEN i % 3 = 0 THEN 'TECH'::event_category WHEN i % 3 = 1 THEN 'BUSINESS'::event_category ELSE 'MUSIC'::event_category END,
                'PUBLISHED'::event_status, 
                ts + interval '30 days', ts + interval '31 days', 
                10 + (i * 5), 100 + (i * 20), false, ts, ts
            );
                    
            INSERT INTO transactions (id, user_id, event_id, type, amount, currency, status, created_at, updated_at, fee)
            VALUES (
                gen_random_uuid(), u_id, evt_id, 
                'TICKET_SALE'::transaction_type, base_amount + (i * 150000), 'VND', 'SUCCESS'::transaction_status, 
                ts, ts, 0
            );
        END LOOP;
    END LOOP;
END $$;
