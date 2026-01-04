import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { Activity, VoteChoice } from '@/types'
import {
  useActivities,
  useUnvotedActivities,
} from '@/queries/useActivitiesSupabase'
import {
  useCreateUser,
  useCreateVote,
  useCurrentUser,
  useResetVotes,
  useUserVotes,
} from '@/queries/useVotesSupabase'
import { SwipeContainer } from '@/components/organisms'
import { UserNameModal, VoteSummary } from '@/components/molecules'
import { SWIPE_CONFIG } from '@/constants/swipeConfig'

const VotePage = () => {
  const { data: allActivities = [] } = useActivities()
  const { data: currentUser } = useCurrentUser()
  const { data: userVotes = [] } = useUserVotes(currentUser?.id)
  const { data: unvotedActivities = [] } = useUnvotedActivities(currentUser?.id)

  const createUser = useCreateUser()
  const createVote = useCreateVote()
  const resetVotes = useResetVotes()

  const [showUserNameModal, setShowUserNameModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [voteHistory, setVoteHistory] = useState<Array<number>>([])

  const totalActivitiesRef = useRef<number | null>(null)

  const [localActivities, setLocalActivities] = useState<Array<Activity>>([])

  useEffect(() => {
    const newActivities =
      unvotedActivities.length > 0 ? unvotedActivities : allActivities
    if (localActivities.length === 0 && newActivities.length > 0) {
      setLocalActivities(newActivities)
      if (totalActivitiesRef.current === null) {
        totalActivitiesRef.current = newActivities.length
      }
    }
  }, [unvotedActivities, allActivities, localActivities.length])

  const activities =
    localActivities.length > 0
      ? localActivities
      : unvotedActivities.length > 0
        ? unvotedActivities
        : allActivities

  const totalActivities =
    totalActivitiesRef.current ??
    (unvotedActivities.length > 0
      ? unvotedActivities.length
      : allActivities.length)

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
            setVoteHistory((prev) => [...prev, currentIndex])
          }, SWIPE_CONFIG.animationDuration)
        },
      },
    )
  }

  const handleRewind = () => {
    if (voteHistory.length > 0) {
      const previousIndex = voteHistory[voteHistory.length - 1]
      setVoteHistory((prev) => prev.slice(0, -1))
      setCurrentIndex(previousIndex)
    }
  }

  const handleRestart = () => {
    if (!currentUser) return
    if (
      window.confirm(
        'Are you sure you want to restart? All your votes will be deleted.',
      )
    ) {
      resetVotes.mutate(currentUser.id, {
        onSuccess: () => {
          setCurrentIndex(0)
          setVoteHistory([])
          setLocalActivities([])
          totalActivitiesRef.current = null
        },
      })
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
            <p className="text-gray-600">Creating profile...</p>
          </div>
        )}
      </div>
    )
  }

  const isCompleted = currentIndex >= totalActivities

  if (
    isCompleted ||
    (unvotedActivities.length === 0 && totalActivitiesRef.current !== null)
  ) {
    return (
      <div className="min-h-screen bg-[#fafafa] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <VoteSummary
            user={currentUser}
            votes={userVotes}
            activities={allActivities}
            onRestart={handleRestart}
          />
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
            Glissez vers la droite pour aimer, vers la gauche pour détester
          </p>
        </div>

        <SwipeContainer
          activities={activities}
          currentIndex={currentIndex}
          totalActivities={totalActivities}
          onSwipe={handleSwipe}
          onRewind={handleRewind}
          canRewind={voteHistory.length > 0}
        />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/vote')({
  component: VotePage,
})
