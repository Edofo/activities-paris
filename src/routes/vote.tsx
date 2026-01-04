import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { Activity, VoteChoice } from '@/types'
import {
  ActivityDetailModal,
  UserNameModal,
  VoteSummary,
} from '@/components/molecules'
import { SwipeContainer } from '@/components/organisms'
import { SWIPE_CONFIG } from '@/constants/swipeConfig'
import { useActivities } from '@/queries/useActivitiesSupabase'
import {
  useCreateUser,
  useCreateVote,
  useCurrentUser,
  useResetVotes,
  useUpdateVote,
  useUserVotes,
} from '@/queries/useVotesSupabase'

const VotePage = () => {
  const { data: allActivities = [] } = useActivities()
  const { data: currentUser } = useCurrentUser()
  const { data: userVotes = [], isFetched: isUserVotesFetched } = useUserVotes(
    currentUser?.id,
  )

  const createUser = useCreateUser()
  const createVote = useCreateVote()
  const updateVote = useUpdateVote()
  const resetVotes = useResetVotes()

  const [showUserNameModal, setShowUserNameModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  )

  useEffect(() => {
    if (isUserVotesFetched) {
      setCurrentIndex(userVotes.length)
    }
  }, [isUserVotesFetched, userVotes.length])

  const totalActivitiesRef = useRef<number | null>(null)

  useEffect(() => {
    if (allActivities.length > 0) {
      if (totalActivitiesRef.current === null) {
        totalActivitiesRef.current = allActivities.length
      }
    }
  }, [allActivities])

  const totalActivities = totalActivitiesRef.current ?? allActivities.length

  useEffect(() => {
    if (!currentUser && !createUser.isPending) {
      setShowUserNameModal(true)
    }
  }, [currentUser, createUser.isPending])

  const handleUserNameConfirm = (name: string) => {
    createUser.mutate(name, {
      onSuccess: () => {
        setShowUserNameModal(false)
        setCurrentIndex(0)
      },
    })
  }

  const handleSwipe = (activityId: string, choice: VoteChoice) => {
    if (!currentUser) return

    createVote.mutate(
      {
        user_id: currentUser.id,
        activity_id: activityId,
        choice,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            const newIndex = currentIndex + 1
            setCurrentIndex(newIndex)
          }, SWIPE_CONFIG.animationDuration)
        },
      },
    )
  }

  const handleRestart = () => {
    if (!currentUser) return
    if (
      window.confirm(
        'Êtes-vous sûr de vouloir recommencer ? Tous vos votes seront supprimés.',
      )
    ) {
      resetVotes.mutate(currentUser.id, {
        onSuccess: () => {
          setCurrentIndex(0)
          totalActivitiesRef.current = null
        },
      })
    }
  }

  const handleVote = (activityId: string, choice: VoteChoice) => {
    if (!currentUser) return

    const existingVote = userVotes.find((v) => v.activityId === activityId)

    if (existingVote?.id) {
      // Update existing vote
      updateVote.mutate(
        { voteId: existingVote.id, choice },
        {
          onSuccess: () => {
            // Optionally close modal after a short delay
          },
        },
      )
    } else {
      // Create new vote
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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <UserNameModal
          isOpen={showUserNameModal}
          onConfirm={handleUserNameConfirm}
        />
        {createUser.isPending && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e94560] mx-auto mb-4"></div>
            <p className="text-gray-600">Création du profil...</p>
          </div>
        )}
      </div>
    )
  }

  const selectedActivityVote = selectedActivity
    ? userVotes.find((v) => v.activityId === selectedActivity.id) || null
    : null

  if (
    currentIndex >= totalActivities ||
    (allActivities.length === 0 && totalActivitiesRef.current !== null)
  ) {
    return (
      <div className="min-h-screen bg-[#fafafa] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <VoteSummary
            user={currentUser}
            votes={userVotes}
            activities={allActivities}
            onRestart={handleRestart}
            onActivityClick={setSelectedActivity}
          />
          {selectedActivity && (
            <ActivityDetailModal
              isOpen={!!selectedActivity}
              activity={selectedActivity}
              vote={selectedActivityVote}
              currentUserId={currentUser.id}
              onClose={() => setSelectedActivity(null)}
              onVote={handleVote}
              isVoting={createVote.isPending || updateVote.isPending}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-2 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold text-[#0f3460] mb-2">
            Bonjour {currentUser.name}! 👋
          </h1>
          <p className="text-gray-600">
            Glissez vers la droite pour faire un vote positif, vers la gauche
            pour un vote négatif
          </p>
        </div>

        <SwipeContainer
          activities={allActivities}
          currentIndex={currentIndex}
          totalActivities={totalActivities}
          votedCount={userVotes.length}
          onSwipe={handleSwipe}
          onRewind={() => setCurrentIndex((prev) => prev - 1)}
          canRewind={currentIndex > 0}
        />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/vote')({
  component: VotePage,
})
