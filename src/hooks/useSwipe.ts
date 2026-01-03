import { useMotionValue, useTransform } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { swipe as swipeConfig } from '@/styles'

export interface UseSwipeReturn {
  x: ReturnType<typeof useMotionValue<number>>
  rotate: ReturnType<typeof useTransform<number, number>>
  opacity: ReturnType<typeof useTransform<number, number>>
  likeOpacity: ReturnType<typeof useTransform<number, number>>
  dislikeOpacity: ReturnType<typeof useTransform<number, number>>
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void
}

export const useSwipe = (
  onSwipe: (direction: 'left' | 'right') => void,
): UseSwipeReturn => {
  const { threshold: swipeThreshold, maxRotation, opacityRange } = swipeConfig

  const x = useMotionValue(0)
  const rotate = useTransform(
    x,
    [opacityRange.min, opacityRange.max],
    [-maxRotation, maxRotation],
  )
  const opacity = useTransform(
    x,
    [
      opacityRange.min,
      opacityRange.mid,
      opacityRange.center,
      opacityRange.midPositive,
      opacityRange.max,
    ],
    [0, 1, 1, 1, 0],
  )
  const likeOpacity = useTransform(
    x,
    [opacityRange.center, swipeThreshold],
    [0, 1],
  )
  const dislikeOpacity = useTransform(
    x,
    [-swipeThreshold, opacityRange.center],
    [1, 0],
  )

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > swipeThreshold) {
      onSwipe('right')
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe('left')
    } else {
      x.set(0)
    }
  }

  return {
    x,
    rotate,
    opacity,
    likeOpacity,
    dislikeOpacity,
    handleDragEnd,
  }
}
