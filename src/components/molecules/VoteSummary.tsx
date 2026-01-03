import { Link } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'
import { VoteItem } from './VoteItem'
import type { Activity, User, Vote } from '@/types'
import { icons } from '@/styles'
import { Button } from '@/components/atoms/Button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/Card'
import { VoteChoice } from '@/types/vote'

export interface VoteSummaryProps {
  user: User
  votes: Array<Vote>
  activities: Array<Activity>
  onRestart?: () => void
}

export const VoteSummary = ({
  user,
  votes,
  activities,
  onRestart,
}: VoteSummaryProps) => {
  const { xxlIconSize } = icons
  const activityMap = new Map(activities.map((a) => [a.id, a]))

  const likedVotes = votes.filter((v) => v.choice === VoteChoice.Like)
  const dislikedVotes = votes.filter((v) => v.choice === VoteChoice.Dislike)

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 size={xxlIconSize} className="text-[#22c55e]" />
        </div>
        <CardTitle className="text-3xl mb-2">Merci {user.name} ! 🎉</CardTitle>
        <p className="text-gray-600">
          Vous avez voté pour {votes.length} activité
          {votes.length > 1 ? 's' : ''}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-[#22c55e] mb-1">
              {likedVotes.length}
            </div>
            <div className="text-sm text-gray-600">Activités aimées</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl font-bold text-[#ef4444] mb-1">
              {dislikedVotes.length}
            </div>
            <div className="text-sm text-gray-600">Activités rejetées</div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#0f3460]">
            Récapitulatif de vos votes
          </h3>
          <div className="space-y-2">
            {votes.map((vote) => {
              const activity = activityMap.get(vote.activityId)
              if (!activity) return null

              return (
                <VoteItem
                  key={vote.activityId}
                  activity={activity}
                  vote={vote}
                />
              )
            })}
          </div>
        </div>

        <div className="flex gap-4 justify-center pt-4 border-t">
          <Link to="/">
            <Button variant="primary" size="lg">
              Voir le classement
            </Button>
          </Link>
          {onRestart && (
            <Button variant="secondary" size="lg" onClick={onRestart}>
              Recommencer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
