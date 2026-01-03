import { useQuery } from '@tanstack/react-query'
import type { Activity } from '@/types'
import { queryKeys } from '@/constants'
import { activitiesService } from '@/services/activities.service'

export const useActivities = () => {
  return useQuery<Array<Activity>>({
    queryKey: queryKeys.activities.all,
    queryFn: activitiesService.getAll,
  })
}
