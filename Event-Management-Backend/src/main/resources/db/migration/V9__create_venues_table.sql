CREATE TABLE venues (
    id UUID PRIMARY KEY,
    organizer_id UUID NOT NULL,
    name VARCHAR(300) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL,
    image_url VARCHAR(1000),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_venue_organizer FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_venues_organizer_id ON venues(organizer_id);
