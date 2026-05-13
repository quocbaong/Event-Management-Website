-- V2: Create Events and Tickets
-- ENUM types
CREATE TYPE event_status AS ENUM (
    'DRAFT', 'PUBLISHED', 'ON_SALE', 'SOLD_OUT', 'ONGOING', 'COMPLETED', 'CANCELLED'
);
CREATE TYPE event_category AS ENUM (
    'MUSIC', 'TECH', 'FOOD', 'ART', 'BUSINESS',
    'SPORTS', 'EDUCATION', 'ENTERTAINMENT', 'OTHER'
);

-- events table
CREATE TABLE events (
    id                    UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    organizer_id          UUID          NOT NULL REFERENCES users(id),
    title                 VARCHAR(300)  NOT NULL,
    slug                  VARCHAR(350)  NOT NULL UNIQUE,
    description           TEXT          NOT NULL,
    short_desc            VARCHAR(500),
    category              event_category NOT NULL DEFAULT 'OTHER',
    status                event_status  NOT NULL DEFAULT 'DRAFT',
    banner_url            VARCHAR(1000),
    thumbnail_url         VARCHAR(1000),
    venue                 VARCHAR(300)  NOT NULL,
    address               TEXT          NOT NULL,
    city                  VARCHAR(100)  NOT NULL,
    latitude              DOUBLE PRECISION,
    longitude             DOUBLE PRECISION,
    start_date            TIMESTAMPTZ   NOT NULL,
    end_date              TIMESTAMPTZ   NOT NULL,
    registration_deadline TIMESTAMPTZ,
    max_attendees         INTEGER,
    current_attendees     INTEGER       NOT NULL DEFAULT 0,
    is_featured           BOOLEAN       NOT NULL DEFAULT FALSE,
    tags                  TEXT[]        DEFAULT '{}',
    published_at          TIMESTAMPTZ,
    created_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_event_dates CHECK (end_date > start_date)
);
CREATE INDEX idx_events_organizer_id ON events(organizer_id);
CREATE INDEX idx_events_status        ON events(status);
CREATE INDEX idx_events_category      ON events(category);
CREATE INDEX idx_events_start_date    ON events(start_date);
CREATE INDEX idx_events_city          ON events(city);
CREATE INDEX idx_events_slug          ON events(slug);
CREATE INDEX idx_events_featured      ON events(is_featured) WHERE is_featured = TRUE;

-- ticket_types table
CREATE TABLE ticket_types (
    id             UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id       UUID          NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name           VARCHAR(200)  NOT NULL,
    description    TEXT,
    price          NUMERIC(19,2) NOT NULL DEFAULT 0,
    total_quantity INTEGER       NOT NULL,
    sold_quantity  INTEGER       NOT NULL DEFAULT 0,
    max_per_order  INTEGER       NOT NULL DEFAULT 10,
    sale_start_date TIMESTAMPTZ,
    sale_end_date   TIMESTAMPTZ,
    is_active      BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_quantity CHECK (sold_quantity <= total_quantity),
    CONSTRAINT chk_price    CHECK (price >= 0)
);
CREATE INDEX idx_ticket_types_event_id ON ticket_types(event_id);
