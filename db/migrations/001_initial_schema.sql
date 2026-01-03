-- ============================================
-- MIGRATION 001: INITIAL SCHEMA
-- ============================================
-- Creates base tables for the application
-- Date: 2024-01-15

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'culture', 'gastronomie', 'sport',
    'nature', 'shopping', 'divertissement'
  )),
  image_url TEXT NOT NULL,
  location TEXT,
  arrondissement TEXT,
  price_range TEXT CHECK (price_range IN ('gratuit', 'euro', 'euro2', 'euro3')),
  duration TEXT,
  tags TEXT[],
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  choice TEXT NOT NULL CHECK (choice IN ('like', 'dislike')),
  voted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, activity_id)
);

CREATE INDEX IF NOT EXISTS idx_votes_user ON votes(user_id);
CREATE INDEX IF NOT EXISTS idx_votes_activity ON votes(activity_id);
CREATE INDEX IF NOT EXISTS idx_votes_choice ON votes(choice);

