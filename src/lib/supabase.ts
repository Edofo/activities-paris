import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

const getSupabase = () => {
  if (!supabaseInstance) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Missing Supabase environment variables. Please check your .env file.',
      )
    }

    supabaseInstance = createClient<Database>(supabaseUrl, supabaseKey)
  }

  return supabaseInstance
}

export const supabase = getSupabase()
