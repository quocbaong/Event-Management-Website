-- V13__add_preferences_to_users.sql
ALTER TABLE users ADD COLUMN preferences jsonb;
