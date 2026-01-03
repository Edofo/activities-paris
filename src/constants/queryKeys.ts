export const queryKeys = {
  activities: {
    all: ['activities'] as const,
    ranking: ['activities', 'ranking'] as const,
    unvoted: (userId: string) => ['activities', 'unvoted', userId] as const,
  },
  votes: {
    all: ['votes'] as const,
    byUser: (userId: string) => ['votes', userId] as const,
  },
  users: {
    all: ['users'] as const,
    current: ['currentUser'] as const,
  },
  session: {
    vote: ['voteSession'] as const,
  },
  demo: {
    todos: ['todos'] as const,
  },
} as const
