-- V4: Create Transactions and Finance
-- ENUM types
CREATE TYPE transaction_type   AS ENUM ('TICKET_SALE', 'REFUND', 'WITHDRAWAL', 'PLATFORM_FEE');
CREATE TYPE transaction_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');
CREATE TYPE withdrawal_status  AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED');

-- transactions table
CREATE TABLE transactions (
    id              UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID               NOT NULL REFERENCES users(id),
    event_id        UUID               REFERENCES events(id),
    registration_id UUID               UNIQUE REFERENCES registrations(id),
    type            transaction_type   NOT NULL,
    status          transaction_status NOT NULL DEFAULT 'PENDING',
    amount          NUMERIC(19,2)      NOT NULL,
    currency        VARCHAR(3)         NOT NULL DEFAULT 'VND',
    description     VARCHAR(500),
    metadata        JSONB,
    reference       VARCHAR(200),
    created_at      TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ        NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_transactions_user_id    ON transactions(user_id);
CREATE INDEX idx_transactions_event_id   ON transactions(event_id);
CREATE INDEX idx_transactions_type       ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);

-- withdrawal_requests table
CREATE TABLE withdrawal_requests (
    id            UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
    organizer_id  UUID              NOT NULL REFERENCES users(id),
    amount        NUMERIC(19,2)     NOT NULL,
    bank_account  VARCHAR(30)       NOT NULL,
    bank_name     VARCHAR(100)      NOT NULL,
    account_owner VARCHAR(200)      NOT NULL,
    status        withdrawal_status NOT NULL DEFAULT 'PENDING',
    note          TEXT,
    admin_note    TEXT,
    processed_by  UUID              REFERENCES users(id),
    requested_at  TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
    processed_at  TIMESTAMPTZ,

    CONSTRAINT chk_withdrawal_amount CHECK (amount > 0)
);
CREATE INDEX idx_withdrawal_organizer_id ON withdrawal_requests(organizer_id);
CREATE INDEX idx_withdrawal_status       ON withdrawal_requests(status);
