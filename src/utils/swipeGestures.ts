import { SWIPE_CONFIG } from '../constants/swipeConfig'

export interface SwipeResult {
  direction: 'left' | 'right' | null
  distance: number
  velocity: number
}

export const calculateSwipeResult = (
  deltaX: number,
  velocityX: number,
): SwipeResult => {
  const distance = Math.abs(deltaX)
  const velocity = Math.abs(velocityX)

  const meetsThreshold =
    distance >= SWIPE_CONFIG.threshold ||
    velocity >= SWIPE_CONFIG.velocityThreshold

  if (!meetsThreshold) {
    return {
      direction: null,
      distance,
      velocity,
    }
  }

  return {
    direction: deltaX > 0 ? 'right' : 'left',
    distance,
    velocity,
  }
}

export const calculateRotation = (deltaX: number): number => {
  const maxRotation = SWIPE_CONFIG.rotationFactor
  const rotation = (deltaX / window.innerWidth) * maxRotation
  return Math.max(-maxRotation, Math.min(maxRotation, rotation))
}
