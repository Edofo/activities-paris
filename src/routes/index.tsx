import { Link, createFileRoute } from '@tanstack/react-router'
import { Trophy, Users } from 'lucide-react'
import { Suspense, lazy, useMemo, useState } from 'react'
import type { ActivityStats } from '@/utils/calculations'
import type { Activity, VoteChoice } from '@/types'
import { ActivityRanking } from '@/components/molecules/ActivityRanking'
import { Button } from '@/components/atoms/Button'
import { ROUTES } from '@/constants'
import { useActivityRanking } from '@/queries/useActivitiesSupabase'
import {
  useCreateVote,
  useCurrentUser,
  useUpdateVote,
  useUserVotes,
  useUsers,
} from '@/queries/useVotesSupabase'
import { icons } from '@/styles'

const ActivityDetailModal = lazy(() =>
  import('@/components/molecules/ActivityDetailModal').then((mod) => ({
    default: mod.ActivityDetailModal,
  })),
)

const HomePage = () => {
  const { largeIconSize, mediumIconSize } = icons

  const { data: ranking = [], isLoading: rankingLoading } = useActivityRanking()
  const { data: users = [], isLoading: usersLoading } = useUsers()
  const { data: currentUser } = useCurrentUser()
  const { data: userVotes = [] } = useUserVotes(currentUser?.id)
  const createVote = useCreateVote()
  const updateVote = useUpdateVote()

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  )

  const sortedStats = useMemo(() => {
    if (!ranking.length) return []
    return ranking.map((r) => ({
      activity: {
        id: r.id,
        name: r.name,
        description: r.description,
        category: r.category,
        imageUrl: r.imageUrl,
        location: r.location,
        arrondissement: r.arrondissement,
        priceRange: r.priceRange,
        duration: r.duration,
        tags: r.tags,
        website: r.website,
        alreadyDone: r.alreadyDone,
      },
      likes: r.likes,
      dislikes: r.dislikes,
      total: r.total_votes,
      percentage: r.like_percentage ?? 0,
      voters: [],
    })) as Array<ActivityStats>
  }, [ranking])

  const allVoters = useMemo(() => {
    return users.map((u) => u.name).sort()
  }, [users])

  const isLoading = rankingLoading || usersLoading

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e94560] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  const top3 = sortedStats.slice(0, 3)
  const others = sortedStats.slice(3)

  const selectedActivityVote = selectedActivity
    ? userVotes.find((v) => v.activityId === selectedActivity.id) || null
    : null

  const handleActivityClick = (stats: ActivityStats) => {
    setSelectedActivity(stats.activity)
  }

  const handleVote = (activityId: string, choice: VoteChoice) => {
    if (!currentUser) return
    const existingVote = userVotes.find((v) => v.activityId === activityId)
    if (existingVote?.id) {
      updateVote.mutate(
        { voteId: existingVote.id, choice },
        {
          onSuccess: () => {
            // Optionally close modal after a short delay
          },
        },
      )
    } else {
      createVote.mutate(
        {
          user_id: currentUser.id,
          activity_id: activityId,
          choice,
        },
        {
          onSuccess: () => {
            // Optionally close modal after a short delay
          },
        },
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0f3460] mb-2">
            Paris Activities Vote
          </h1>
          <p className="text-gray-600">
            Découvrez les activités favorites de la famille
          </p>
        </div>

        {allVoters.length > 0 && (
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Users size={mediumIconSize} />
            <span>
              Membres de la famille: <strong>{allVoters.join(', ')}</strong>
            </span>
          </div>
        )}

        <div className="mb-8 text-center">
          <Link to={ROUTES.VOTE}>
            <Button variant="primary" size="lg">
              <Trophy className="mr-2" size={largeIconSize} />
              Voter maintenant
            </Button>
          </Link>
        </div>

        {top3.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0f3460] mb-6 text-center">
              🏆 Podium
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {top3[1] && (
                <div className="order-2 md:order-1">
                  <ActivityRanking
                    stats={top3[1]}
                    position={2}
                    onClick={() => handleActivityClick(top3[1])}
                  />
                </div>
              )}

              {top3[0] && (
                <div className="order-1 md:order-2">
                  <ActivityRanking
                    stats={top3[0]}
                    position={1}
                    onClick={() => handleActivityClick(top3[0])}
                  />
                </div>
              )}

              {top3[2] && (
                <div className="order-3">
                  <ActivityRanking
                    stats={top3[2]}
                    position={3}
                    onClick={() => handleActivityClick(top3[2])}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#0f3460] mb-6">
              Classement complet
            </h2>
            <div className="space-y-4">
              {others.map((stats, index) => (
                <ActivityRanking
                  key={stats.activity.id}
                  stats={stats}
                  position={index + 4}
                  onClick={() => handleActivityClick(stats)}
                />
              ))}
            </div>
          </div>
        )}

        {sortedStats.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              Aucun vote n'a été enregistré encore.
            </p>
            <Link to={ROUTES.VOTE}>
              <Button variant="primary">Commencer à voter</Button>
            </Link>
          </div>
        )}

        {/* {selectedActivity && <></>} */}

        {selectedActivity && (
          <Suspense fallback={null}>
            <ActivityDetailModal
              isOpen={!!selectedActivity}
              activity={selectedActivity}
              vote={selectedActivityVote}
              currentUserId={currentUser?.id}
              onClose={() => setSelectedActivity(null)}
              onVote={handleVote}
              isVoting={createVote.isPending || updateVote.isPending}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
})
