import type { Activity, Vote } from '@/types'
import { VoteChoice } from '@/types/vote'

export interface VoteStats {
  total: number
  likes: number
  dislikes: number
  percentage: {
    likes: number
    dislikes: number
  }
}

export const calculateVoteStats = (votes: Array<Vote>): VoteStats => {
  const total = votes.length
  const likes = votes.filter((v) => v.choice === VoteChoice.Like).length
  const dislikes = total - likes

  return {
    total,
    likes,
    dislikes,
    percentage: {
      likes: total > 0 ? Math.round((likes / total) * 100) : 0,
      dislikes: total > 0 ? Math.round((dislikes / total) * 100) : 0,
    },
  }
}

export const getVoteForActivity = (
  votes: Array<Vote>,
  activityId: string,
): Vote | undefined => {
  return votes.find((v) => v.activityId === activityId)
}

export const getActivitiesByVote = (
  activities: Array<Activity>,
  votes: Array<Vote>,
  choice: VoteChoice,
): Array<Activity> => {
  const votedActivityIds = votes
    .filter((v) => v.choice === choice)
    .map((v) => v.activityId)

  return activities.filter((a) => votedActivityIds.includes(a.id))
}
