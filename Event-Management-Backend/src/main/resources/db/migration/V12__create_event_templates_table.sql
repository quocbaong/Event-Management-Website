CREATE TABLE event_templates (
    id                UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    organizer_id      UUID         NOT NULL REFERENCES users(id),
    name              VARCHAR(300) NOT NULL,
    description       TEXT,
    category          event_category,
    venue             VARCHAR(300),
    address           TEXT,
    city              VARCHAR(100),
    banner_url        VARCHAR(1000),
    tags              TEXT[],
    ticket_types_json JSONB,
    schedules_json    JSONB,
    timelines_json    JSONB,
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_templates_organizer_id ON event_templates(organizer_id);
