-- V1: Create Users and Profiles
-- ENUM types
CREATE TYPE user_role AS ENUM ('ADMIN', 'ORGANIZER', 'ATTENDEE');

-- users table
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          user_role    NOT NULL DEFAULT 'ATTENDEE',
    is_verified   BOOLEAN      NOT NULL DEFAULT FALSE,
    is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);

-- organizer_profiles table
CREATE TABLE organizer_profiles (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID         NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company_name     VARCHAR(200),
    phone            VARCHAR(20),
    bio              TEXT,
    website          VARCHAR(500),
    logo_url         VARCHAR(1000),
    bank_account     VARCHAR(30),
    bank_name        VARCHAR(100),
    bank_owner       VARCHAR(200),
    is_verified      BOOLEAN      NOT NULL DEFAULT FALSE,
    total_revenue    NUMERIC(19,2)NOT NULL DEFAULT 0,
    available_balance NUMERIC(19,2) NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- attendee_profiles table
CREATE TABLE attendee_profiles (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID        NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    display_name  VARCHAR(200),
    phone         VARCHAR(20),
    avatar_url    VARCHAR(1000),
    date_of_birth DATE,
    address       TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- refresh_tokens table
CREATE TABLE refresh_tokens (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255)NOT NULL UNIQUE,
    is_revoked BOOLEAN     NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_hash ON refresh_tokens(token_hash);
