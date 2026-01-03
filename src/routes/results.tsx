import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useActivities } from '../queries/useActivities'
import { useLocalVotes } from '../hooks/useLocalVotes'
import {
  calculateVoteStats,
  getActivitiesByVote,
} from '../utils/voteCalculations'
import { ROUTES } from '../constants'
import { VoteChoice } from '@/types/vote'
import { getCurrentUser } from '@/utils/storage'
import { Button, Card } from '@/components/atoms'

const ResultsPage = () => {
  const navigate = useNavigate()
  const { sessionId } = Route.useSearch()
  const { data: activities = [] } = useActivities()

  if (!sessionId) {
    navigate({ to: ROUTES.HOME })
    return null
  }

  const currentUser = getCurrentUser()
  const sessionName = currentUser?.userName || 'Unknown'

  const { votes } = useLocalVotes(sessionId, sessionName)

  const stats = calculateVoteStats(votes)
  const likedActivities = getActivitiesByVote(
    activities,
    votes,
    VoteChoice.Like,
  )
  const dislikedActivities = getActivitiesByVote(
    activities,
    votes,
    VoteChoice.Dislike,
  )

  const handleEdit = () => {
    navigate({ to: ROUTES.VOTE })
  }

  const handleNewVote = () => {
    navigate({ to: ROUTES.HOME })
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Résultats de vos votes
            </h1>

            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  {stats.likes}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Activités approuvées
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {stats.percentage.likes}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600">
                  {stats.dislikes}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Activités rejetées
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {stats.percentage.dislikes}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total voté</div>
              </div>
            </div>
          </div>

          {likedActivities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-600">✓</span> Activités approuvées
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {likedActivities.map((activity) => (
                  <Card key={activity.id} className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {activity.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {activity.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {dislikedActivities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-red-600">✗</span> Activités rejetées
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dislikedActivities.map((activity) => (
                  <Card key={activity.id} className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {activity.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {activity.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center pt-6 border-t">
            <Button variant="primary" size="lg" onClick={handleEdit}>
              Modifier mes votes
            </Button>
            <Button variant="secondary" size="lg" onClick={handleNewVote}>
              Nouveau vote
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/results')({
  component: ResultsPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sessionId: (search.sessionId as string) || '',
    }
  },
})
