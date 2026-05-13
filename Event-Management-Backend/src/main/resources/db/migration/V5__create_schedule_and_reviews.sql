-- V5: Create Schedule and Reviews
-- event_schedules table
CREATE TABLE event_schedules (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id    UUID        NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    title       VARCHAR(300)NOT NULL,
    description TEXT,
    start_time  TIMESTAMPTZ NOT NULL,
    end_time    TIMESTAMPTZ NOT NULL,
    location    VARCHAR(300),
    speaker     VARCHAR(200),
    icon        VARCHAR(50),
    sort_order  INTEGER     NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_event_schedules_event_id ON event_schedules(event_id);

-- event_timelines table
CREATE TABLE event_timelines (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id    UUID        NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    title       VARCHAR(300)NOT NULL,
    description TEXT,
    due_date    TIMESTAMPTZ NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    assignee    VARCHAR(200),
    priority    VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    progress    INTEGER     NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    sort_order  INTEGER     NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_event_timelines_event_id ON event_timelines(event_id);

-- reviews table
CREATE TABLE reviews (
    id        UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id  UUID        NOT NULL REFERENCES events(id),
    user_id   UUID        NOT NULL REFERENCES users(id),
    rating    NUMERIC(2,1)NOT NULL CHECK (rating BETWEEN 1.0 AND 5.0),
    comment   TEXT,
    is_public BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_review UNIQUE (event_id, user_id)
);
CREATE INDEX idx_reviews_event_id ON reviews(event_id);
