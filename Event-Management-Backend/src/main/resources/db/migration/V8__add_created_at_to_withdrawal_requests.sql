-- V8: Add missing created_at column to withdrawal_requests
ALTER TABLE withdrawal_requests ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
