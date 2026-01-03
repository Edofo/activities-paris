import type { UserVotes, VoteSession } from '@/types'
import { config } from '@/constants'

const { storageKeys } = config

export const getUsers = (): Array<UserVotes> => {
  try {
    const data = localStorage.getItem(storageKeys.users)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const saveUsers = (users: Array<UserVotes>): void => {
  try {
    localStorage.setItem(storageKeys.users, JSON.stringify(users))
  } catch (error) {
    console.error('Error saving users:', error)
  }
}

export const getCurrentUserId = (): string | null => {
  try {
    return localStorage.getItem(storageKeys.currentUser)
  } catch {
    return null
  }
}

export const setCurrentUserId = (userId: string): void => {
  try {
    localStorage.setItem(storageKeys.currentUser, userId)
  } catch (error) {
    console.error('Error saving current user:', error)
  }
}

export const getCurrentUser = (): UserVotes | null => {
  const userId = getCurrentUserId()
  if (!userId) return null

  const users = getUsers()
  return users.find((u) => u.userId === userId) || null
}

export const saveUser = (user: UserVotes): void => {
  const users = getUsers()
  const index = users.findIndex((u) => u.userId === user.userId)

  if (index >= 0) {
    users[index] = user
  } else {
    users.push(user)
  }

  saveUsers(users)
  setCurrentUserId(user.userId)
}

export const getVoteSession = (): VoteSession | null => {
  try {
    const data = localStorage.getItem(storageKeys.session)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export const saveVoteSession = (session: VoteSession): void => {
  try {
    localStorage.setItem(storageKeys.session, JSON.stringify(session))
  } catch (error) {
    console.error('Error saving vote session:', error)
  }
}

export const resetVoteSession = (): void => {
  try {
    localStorage.removeItem(storageKeys.session)
  } catch (error) {
    console.error('Error resetting vote session:', error)
  }
}

export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
