-- V19: Add is_sales_active column to events table to allow pausing ticket sales
ALTER TABLE events ADD COLUMN is_sales_active BOOLEAN NOT NULL DEFAULT TRUE;
