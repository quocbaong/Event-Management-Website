-- V6: Create Notifications and Feedback
-- ENUM
CREATE TYPE notification_type AS ENUM (
    'SYSTEM', 'EVENT_UPDATE', 'TICKET_CONFIRMED',
    'PAYMENT_SUCCESS', 'WITHDRAWAL_UPDATE', 'BROADCAST', 'REMINDER'
);

-- notifications table
CREATE TABLE notifications (
    id        UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id   UUID              NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type      notification_type NOT NULL,
    title     VARCHAR(300)      NOT NULL,
    body      TEXT              NOT NULL,
    data      JSONB,
    is_read   BOOLEAN           NOT NULL DEFAULT FALSE,
    read_at   TIMESTAMPTZ,
    created_at TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created_at  ON notifications(created_at DESC);

-- broadcasts table
CREATE TABLE broadcasts (
    id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id    UUID        NOT NULL REFERENCES users(id),
    event_id     UUID        REFERENCES events(id),
    title        VARCHAR(300)NOT NULL,
    message      TEXT        NOT NULL,
    target_group VARCHAR(50) NOT NULL DEFAULT 'all',
    sent_count   INTEGER     NOT NULL DEFAULT 0,
    status       VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    scheduled_at TIMESTAMPTZ,
    sent_at      TIMESTAMPTZ,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- feedbacks table
CREATE TABLE feedbacks (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        REFERENCES users(id),
    subject     VARCHAR(300)NOT NULL,
    message     TEXT        NOT NULL,
    category    VARCHAR(50) NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    admin_reply TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);
CREATE INDEX idx_feedbacks_status ON feedbacks(status);
