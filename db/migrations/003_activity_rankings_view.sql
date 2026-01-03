-- ============================================
-- MIGRATION 003: ACTIVITY RANKINGS VIEW
-- ============================================
-- Creates view calculating activity rankings
-- Date: 2024-01-15

CREATE OR REPLACE VIEW activity_rankings AS
SELECT
  a.*,
  COUNT(v.id) FILTER (WHERE v.choice = 'like') as likes,
  COUNT(v.id) FILTER (WHERE v.choice = 'dislike') as dislikes,
  COUNT(v.id) as total_votes,
  ROUND(
    COUNT(v.id) FILTER (WHERE v.choice = 'like')::numeric /
    NULLIF(COUNT(v.id), 0) * 100, 1
  ) as like_percentage
FROM activities a
LEFT JOIN votes v ON a.id = v.activity_id
GROUP BY a.id
ORDER BY likes DESC, like_percentage DESC;

