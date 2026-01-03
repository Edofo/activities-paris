-- ============================================
-- MIGRATION 002: ROW LEVEL SECURITY (RLS)
-- ============================================
-- Configures security policies for tables
-- Date: 2024-01-15

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read activities" ON activities
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read votes" ON votes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert votes" ON votes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update votes" ON votes
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete votes" ON votes
  FOR DELETE USING (true);

