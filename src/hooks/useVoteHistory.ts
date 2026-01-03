import { useCallback, useState } from 'react'
import { SWIPE_CONFIG } from '../constants/swipeConfig'
import type { VoteChoice } from '@/types/vote'

export const useVoteHistory = (
  maxHistory: number = SWIPE_CONFIG.maxHistoryLength,
) => {
  const [history, setHistory] = useState<Array<VoteChoice>>([])

  const canRewind = history.length > 0

  const pushAction = useCallback(
    (action: VoteChoice) => {
      setHistory((prev) => {
        const newHistory = [action, ...prev]
        return newHistory.slice(0, maxHistory)
      })
    },
    [maxHistory],
  )

  const popAction = useCallback((): VoteChoice | null => {
    let action: VoteChoice | null = null
    setHistory((prev) => {
      if (prev.length === 0) return prev
      const [first, ...rest] = prev
      action = first
      return rest
    })
    return action
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return {
    canRewind,
    pushAction,
    popAction,
    clearHistory,
    historyLength: history.length,
  }
}
