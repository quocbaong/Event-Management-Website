-- V3: Create Registrations and Tickets
-- ENUM types
CREATE TYPE registration_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'REFUNDED');
CREATE TYPE ticket_status        AS ENUM ('ACTIVE', 'USED', 'CANCELLED', 'REFUNDED');

-- registrations table
CREATE TABLE registrations (
    id              UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id        UUID                NOT NULL REFERENCES events(id),
    attendee_id     UUID                NOT NULL REFERENCES users(id),
    status          registration_status NOT NULL DEFAULT 'PENDING',
    total_amount    NUMERIC(19,2)       NOT NULL,
    discount_amount NUMERIC(19,2)       NOT NULL DEFAULT 0,
    final_amount    NUMERIC(19,2)       NOT NULL,
    coupon_code     VARCHAR(50),
    notes           TEXT,
    created_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    confirmed_at    TIMESTAMPTZ,
    cancelled_at    TIMESTAMPTZ,

    CONSTRAINT uq_registration UNIQUE (event_id, attendee_id),
    CONSTRAINT chk_amounts CHECK (final_amount >= 0 AND total_amount >= 0)
);
CREATE INDEX idx_registrations_attendee_id ON registrations(attendee_id);
CREATE INDEX idx_registrations_event_id    ON registrations(event_id);
CREATE INDEX idx_registrations_status      ON registrations(status);

-- tickets table
CREATE TABLE tickets (
    id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id UUID          NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    ticket_type_id  UUID          NOT NULL REFERENCES ticket_types(id),
    ticket_code     VARCHAR(50)   NOT NULL UNIQUE,
    status          ticket_status NOT NULL DEFAULT 'ACTIVE',
    holder_name     VARCHAR(200),
    holder_email    VARCHAR(255),
    holder_phone    VARCHAR(20),
    checked_in_at   TIMESTAMPTZ,
    checked_in_by   UUID          REFERENCES users(id),
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_tickets_registration_id ON tickets(registration_id);
CREATE INDEX idx_tickets_code            ON tickets(ticket_code);
CREATE INDEX idx_tickets_status          ON tickets(status);

-- qr_codes table
CREATE TABLE qr_codes (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id  UUID        NOT NULL UNIQUE REFERENCES tickets(id) ON DELETE CASCADE,
    token      VARCHAR(500)NOT NULL UNIQUE,
    image_url  VARCHAR(1000),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
