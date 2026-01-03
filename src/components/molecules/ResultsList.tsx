import { Check, X } from 'lucide-react'
import { Card } from '../atoms/Card'
import { Badge } from '../atoms/Badge'
import { getVoteForActivity } from '../../utils/voteCalculations'
import { VoteChoice } from '../../types/vote'
import type { Activity } from '../../types/activity'
import type { Vote } from '../../types/vote'

interface ResultsListProps {
  activities: Array<Activity>
  votes: Array<Vote>
  onToggleVote: (activityId: string, decision: VoteChoice) => void
}

export const ResultsList = ({
  activities,
  votes,
  onToggleVote,
}: ResultsListProps) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const vote = getVoteForActivity(votes, activity.id)
        const decision = vote?.choice || null

        return (
          <Card key={activity.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activity.name}
                  </h3>
                  {decision && (
                    <Badge
                      variant={
                        decision === VoteChoice.Like ? 'success' : 'danger'
                      }
                    >
                      {decision === VoteChoice.Like ? 'Like' : 'Dislike'}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {activity.description}
                </p>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onToggleVote(activity.id, VoteChoice.Like)}
                  className={`p-2 rounded-lg transition-colors ${
                    decision === VoteChoice.Like
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label="Toggle like"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => onToggleVote(activity.id, VoteChoice.Dislike)}
                  className={`p-2 rounded-lg transition-colors ${
                    decision === VoteChoice.Dislike
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label="Toggle dislike"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
