import { animate, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Heart, X } from 'lucide-react'
import { ActivityCard } from './ActivityCard'
import type { PanInfo } from 'framer-motion'
import type { Activity } from '@/types'
import { card, icons, swipe as swipeConfig } from '@/styles'
import { cn } from '@/lib/utils'
import { useSwipe } from '@/hooks/useSwipe'

export interface SwipeCardProps {
  activity: Activity
  onSwipe: (direction: 'left' | 'right') => void
  className?: string
  triggerSwipe?: 'left' | 'right' | null
}

export const SwipeCard = ({
  activity,
  onSwipe,
  className,
  triggerSwipe,
}: SwipeCardProps) => {
  const {
    threshold: swipeThreshold,
    velocityThreshold,
    exitDistance,
    animationDuration,
    springStiffness,
    springDamping,
    dragRange,
    dragElastic,
  } = swipeConfig
  const { initialScale } = card

  const [isExiting, setIsExiting] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null,
  )
  const { x, rotate, opacity, likeOpacity, dislikeOpacity } = useSwipe(() => {})
  const previousTriggerSwipe = useRef(triggerSwipe)

  const performSwipe = async (direction: 'left' | 'right') => {
    if (isExiting) return
    setIsExiting(true)
    setSwipeDirection(direction)
    const targetX = direction === 'right' ? exitDistance : -exitDistance
    await animate(x, targetX, {
      duration: animationDuration,
    })
    x.set(targetX)
    onSwipe(direction)
  }

  useEffect(() => {
    if (
      triggerSwipe &&
      triggerSwipe !== previousTriggerSwipe.current &&
      !isExiting
    ) {
      performSwipe(triggerSwipe)
    }
    previousTriggerSwipe.current = triggerSwipe
  }, [triggerSwipe, isExiting])

  const handleDragEnd = async (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      await performSwipe('right')
    } else if (
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -velocityThreshold
    ) {
      await performSwipe('left')
    } else {
      animate(x, 0, {
        duration: animationDuration,
        type: 'spring',
      })
    }
  }

  return (
    <motion.div
      className={cn('inset-0 w-full h-full', className)}
      style={{
        x,
        rotate,
        opacity: isExiting ? 0 : opacity,
        pointerEvents: isExiting ? 'none' : 'auto',
        zIndex: isExiting ? 0 : 1,
      }}
      drag="x"
      dragConstraints={{ left: -dragRange, right: dragRange }}
      dragElastic={dragElastic}
      onDragEnd={handleDragEnd}
      initial={{ scale: initialScale, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={
        swipeDirection
          ? {
              x: swipeDirection === 'right' ? exitDistance : -exitDistance,
              opacity: 0,
              transition: { duration: 0 },
            }
          : {
              scale: initialScale,
              opacity: 0,
              x: 0,
              transition: { duration: 0 },
            }
      }
      transition={{
        type: 'spring',
        stiffness: springStiffness,
        damping: springDamping,
      }}
    >
      <div className="relative w-full h-full">
        <ActivityCard activity={activity} showDescription={true} />

        <motion.div
          className="absolute inset-0 bg-[#22c55e] bg-opacity-80 flex items-center justify-center rounded-lg pointer-events-none"
          style={{ opacity: likeOpacity }}
        >
          <div className="text-white text-6xl font-bold">
            <Heart
              className="fill-white"
              style={{
                width: icons.overlayIconSize,
                height: icons.overlayIconSize,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-[#ef4444] bg-opacity-80 flex items-center justify-center rounded-lg pointer-events-none"
          style={{ opacity: dislikeOpacity }}
        >
          <div className="text-white text-6xl font-bold">
            <X
              style={{
                width: icons.overlayIconSize,
                height: icons.overlayIconSize,
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
