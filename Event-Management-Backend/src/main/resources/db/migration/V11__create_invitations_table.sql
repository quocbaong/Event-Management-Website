CREATE TYPE invite_status AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED');

CREATE TABLE invitations (
    id            UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id      UUID           NOT NULL REFERENCES events(id),
    invited_by    UUID           NOT NULL REFERENCES users(id),
    email         VARCHAR(255)   NOT NULL,
    token         VARCHAR(500)   NOT NULL UNIQUE,
    status        invite_status  NOT NULL DEFAULT 'PENDING',
    sent_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    responded_at  TIMESTAMPTZ,
    created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_invitations_event_id ON invitations(event_id);
CREATE INDEX idx_invitations_email    ON invitations(email);
