import type { User } from '@/types'
import type { UserInsert } from '@/types/database'
import { config, database } from '@/constants'
import { supabase } from '@/lib/supabase'

export const usersService = {
  async create(name: string): Promise<User> {
    const { data, error } = await supabase
      .from(database.tables.users)
      // @ts-expect-error - insertData is not typed
      .insert({ name } as UserInsert)
      .select()
      .single()

    if (error) throw error

    // @ts-expect-error - data is not typed
    localStorage.setItem(config.storageKeys.localUser, data.id)
    return data
  },

  async getCurrent(): Promise<User | null> {
    const userId = localStorage.getItem(config.storageKeys.localUser)
    if (!userId) return null

    const { data, error } = await supabase
      .from(database.tables.users)
      .select('*')
      .eq(database.columns.id, userId)
      .single()

    if (error) {
      // Clear invalid user ID from storage
      if (error.code === 'PGRST116') {
        localStorage.removeItem(config.storageKeys.localUser)
      }
      return null
    }
    return data
  },

  async getAll(): Promise<Array<User>> {
    const { data, error } = await supabase
      .from(database.tables.users)
      .select('*')
      .order(database.columns.name, { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`)
    }
    return data
  },

  logout(): void {
    localStorage.removeItem(config.storageKeys.localUser)
  },
}
