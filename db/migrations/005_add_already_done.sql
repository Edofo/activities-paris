-- ============================================
-- MIGRATION 005: ADD ALREADY_DONE FIELD
-- ============================================
-- Adds already_done field to activities table
-- Date: 2025-01-27

ALTER TABLE activities 
ADD COLUMN already_done BOOLEAN NOT NULL DEFAULT false;

