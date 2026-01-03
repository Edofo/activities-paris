import { useQuery } from '@tanstack/react-query'
import type { Activity, ActivityWithRanking } from '@/types'
import { queryKeys } from '@/constants'
import { activitiesService } from '@/services/activities.service'

export const useActivities = () => {
  return useQuery<Array<Activity>>({
    queryKey: queryKeys.activities.all,
    queryFn: activitiesService.getAll,
  })
}

export const useActivityRanking = () => {
  return useQuery<Array<ActivityWithRanking>>({
    queryKey: queryKeys.activities.ranking,
    queryFn: activitiesService.getRanking,
  })
}

export const useUnvotedActivities = (userId: string | undefined) => {
  return useQuery<Array<Activity>>({
    queryKey: queryKeys.activities.unvoted(userId!),
    queryFn: () => activitiesService.getUnvotedByUser(userId!),
    enabled: !!userId,
  })
}
