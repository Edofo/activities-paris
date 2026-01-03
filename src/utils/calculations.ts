import type { Activity, UserVotes, Vote } from '@/types'
import { VoteChoice } from '@/types'

export interface ActivityStats {
  activity: Activity
  likes: number
  dislikes: number
  total: number
  percentage: number
  voters: Array<string>
}

export const calculateActivityStats = (
  activities: Array<Activity>,
  allUsers: Array<UserVotes>,
): Array<ActivityStats> => {
  const statsMap = new Map<string, ActivityStats>()

  activities.forEach((activity) => {
    statsMap.set(activity.id, {
      activity,
      likes: 0,
      dislikes: 0,
      total: 0,
      percentage: 0,
      voters: [],
    })
  })

  allUsers.forEach((user) => {
    user.votes.forEach((vote) => {
      const stats = statsMap.get(vote.activityId)
      if (stats) {
        if (vote.choice === VoteChoice.Like) {
          stats.likes++
        } else {
          stats.dislikes++
        }
        stats.total++
        if (!stats.voters.includes(user.userName)) {
          stats.voters.push(user.userName)
        }
      }
    })
  })

  const allStats = Array.from(statsMap.values())
  const maxVotes = Math.max(...allStats.map((s) => s.total), 1)

  allStats.forEach((stats) => {
    stats.percentage = maxVotes > 0 ? (stats.likes / maxVotes) * 100 : 0
  })

  return allStats
}

export const sortActivitiesByLikes = (
  stats: Array<ActivityStats>,
): Array<ActivityStats> => {
  return [...stats].sort((a, b) => {
    if (b.likes !== a.likes) {
      return b.likes - a.likes
    }
    return b.total - a.total
  })
}

export const getActivityRanking = (
  activityId: string,
  sortedStats: Array<ActivityStats>,
): number => {
  return sortedStats.findIndex((s) => s.activity.id === activityId) + 1
}

export const getUserVoteForActivity = (
  user: UserVotes | null,
  activityId: string,
): Vote | null => {
  if (!user) return null
  return user.votes.find((v) => v.activityId === activityId) || null
}

export const calculateVoteProgress = (
  currentIndex: number,
  totalActivities: number,
): number => {
  if (totalActivities === 0) return 0
  return Math.round((currentIndex / totalActivities) * 100)
}
