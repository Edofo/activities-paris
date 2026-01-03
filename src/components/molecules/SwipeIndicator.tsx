import { Check, X } from 'lucide-react'
import { motion, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

interface SwipeIndicatorProps {
  x: MotionValue<number>
}

export const SwipeIndicator = ({ x }: SwipeIndicatorProps) => {
  const likeOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1])
  const dislikeOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0])

  return (
    <>
      <motion.div
        className="absolute top-1/2 right-8 transform -translate-y-1/2 pointer-events-none z-10"
        style={{ opacity: likeOpacity }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="bg-green-500 rounded-full p-4 mb-2">
            <Check size={32} className="text-white" />
          </div>
          <span className="text-green-600 font-bold text-lg">LIKE</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-8 transform -translate-y-1/2 pointer-events-none z-10"
        style={{ opacity: dislikeOpacity }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="bg-red-500 rounded-full p-4 mb-2">
            <X size={32} className="text-white" />
          </div>
          <span className="text-red-600 font-bold text-lg">DISLIKE</span>
        </div>
      </motion.div>
    </>
  )
}
