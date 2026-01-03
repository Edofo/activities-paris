import type { Activity, Vote } from '@/types'
import { VoteItem } from '@/components/molecules/VoteItem'
import { cn } from '@/lib/utils'

export interface VoteListProps {
  activities: Array<Activity>
  votes: Array<Vote>
  onEditVote?: (activityId: string) => void
  className?: string
}

export const VoteList = ({
  activities,
  votes,
  onEditVote,
  className,
}: VoteListProps) => {
  const voteMap = new Map(votes.map((v) => [v.activityId, v]))

  if (votes.length === 0) {
    return (
      <div className={cn('text-center text-gray-500 py-8', className)}>
        Aucun vote enregistré
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      {activities.map((activity) => {
        const vote = voteMap.get(activity.id) || null
        return (
          <VoteItem
            key={activity.id}
            activity={activity}
            vote={vote}
            onEdit={onEditVote ? () => onEditVote(activity.id) : undefined}
          />
        )
      })}
    </div>
  )
}
