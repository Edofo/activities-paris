import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Activity } from '@/types'
import { SwipeCard, SwipeControls } from '@/components/molecules'
import { ProgressBar } from '@/components/atoms'
import { calculateVoteProgress } from '@/utils/calculations'
import { card } from '@/styles'
import { cn } from '@/lib/utils'
import { VoteChoice } from '@/types'

export interface SwipeContainerProps {
  activities: Array<Activity>
  currentIndex: number
  totalActivities: number
  votedCount: number
  onSwipe: (activityId: string, choice: VoteChoice) => void
  onRewind: () => void
  canRewind: boolean
  className?: string
}

export const SwipeContainer = ({
  activities,
  currentIndex,
  totalActivities,
  votedCount,
  onSwipe,
  onRewind,
  canRewind,
  className,
}: SwipeContainerProps) => {
  const { nextCardScale, nextCardOpacity } = card
  const [triggerSwipe, setTriggerSwipe] = useState<'left' | 'right' | null>(
    null,
  )

  const progress = calculateVoteProgress(votedCount, totalActivities)

  if (
    currentIndex >= totalActivities ||
    activities.length === 0 ||
    currentIndex >= activities.length
  ) {
    return (
      <div className={cn('text-center text-gray-500 py-8', className)}>
        All activities have been voted!
      </div>
    )
  }

  const currentActivity = activities[currentIndex]

  useEffect(() => {
    setTriggerSwipe(null)
  }, [currentIndex])

  const handleSwipe = (direction: 'left' | 'right') => {
    setTriggerSwipe(direction)
  }

  const handleSwipeComplete = (direction: 'left' | 'right') => {
    const choice = direction === 'right' ? VoteChoice.Like : VoteChoice.Dislike
    onSwipe(currentActivity.id, choice)
  }

  return (
    <div className={cn('relative', className)}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {votedCount} sur {totalActivities}
          </span>
          <span className="text-sm text-gray-500">{progress}%</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <div className="relative max-w-md mx-auto">
        {activities[currentIndex + 1] ? (
          <div
            key={`next-${activities[currentIndex + 1].id}`}
            className="absolute inset-0"
            style={{
              transform: `scale(${nextCardScale})`,
              opacity: nextCardOpacity,
            }}
          >
            <SwipeCard
              activity={activities[currentIndex + 1]}
              onSwipe={() => {}}
              className="pointer-events-none"
            />
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          <SwipeCard
            key={currentActivity.id}
            activity={currentActivity}
            onSwipe={handleSwipeComplete}
            triggerSwipe={triggerSwipe}
          />
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center">
        <SwipeControls
          onDislike={() => handleSwipe('left')}
          onRewind={onRewind}
          onLike={() => handleSwipe('right')}
          canRewind={canRewind}
        />
      </div>
    </div>
  )
}
