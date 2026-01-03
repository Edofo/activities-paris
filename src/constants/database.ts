export const database = {
  tables: {
    users: 'users',
    activities: 'activities',
    votes: 'votes',
  },
  views: {
    activityRankings: 'activity_rankings',
  },
  columns: {
    id: 'id',
    name: 'name',
    userId: 'user_id',
    activityId: 'activity_id',
    votedAt: 'voted_at',
    likes: 'likes',
  },
  channels: {
    votesChanges: 'votes-changes',
  },
  events: {
    postgresChanges: 'postgres_changes',
  },
  schema: {
    public: 'public',
  },
} as const
