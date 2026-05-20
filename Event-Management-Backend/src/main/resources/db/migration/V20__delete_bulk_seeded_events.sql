-- V20: Dọn dẹp dữ liệu sự kiện hoành tráng được seed hàng loạt

-- 1. Xóa các giao dịch (transactions) liên quan đến sự kiện demo
DELETE FROM transactions 
WHERE event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%')
   OR registration_id IN (SELECT id FROM registrations WHERE event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%'));

-- 2. Xóa mã QR liên quan đến các vé của sự kiện demo
DELETE FROM qr_codes 
WHERE ticket_id IN (
    SELECT t.id FROM tickets t 
    JOIN registrations r ON t.registration_id = r.id 
    WHERE r.event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%')
);

-- 3. Xóa các vé (tickets) liên quan đến lượt đăng ký của sự kiện demo
DELETE FROM tickets 
WHERE registration_id IN (
    SELECT id FROM registrations 
    WHERE event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%')
);

-- 4. Xóa lượt đăng ký (registrations) liên quan đến các sự kiện demo
DELETE FROM registrations 
WHERE event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%');

-- 5. Xóa loại vé (ticket_types) liên quan đến các sự kiện demo
DELETE FROM ticket_types 
WHERE event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%');

-- 6. Xóa lịch trình (event_schedules) và dòng thời gian (event_timelines)
DELETE FROM event_schedules 
WHERE event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%');

DELETE FROM event_timelines 
WHERE event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%');

-- 7. Xóa đánh giá (reviews) và lời mời (invitations) nếu có
DELETE FROM reviews 
WHERE event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%');

DELETE FROM invitations 
WHERE event_id IN (SELECT id FROM events WHERE slug LIKE 'su-kien-hoanh-trang-%');

-- 8. Xóa chính các sự kiện demo
DELETE FROM events 
WHERE slug LIKE 'su-kien-hoanh-trang-%';


