/**
 * Types générés depuis Supabase
 *
 * Pour générer les vrais types, exécutez :
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
 *
 * En attendant, voici une structure de base qui correspond au schéma SQL fourni
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Array<Json>

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          name: string
          description: string | null
          category:
            | 'jardin'
            | 'parc'
            | 'chateau'
            | 'musee'
            | 'expo'
            | 'spectacle'
            | 'quartier'
            | 'tourisme_historique'
            | 'autre'
          image_url: string
          location: string | null
          arrondissement: string | null
          price_range: 'gratuit' | 'euro' | 'euro2' | 'euro3' | null
          duration: string | null
          tags: Array<string> | null
          website: string | null
          already_done: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category:
            | 'jardin'
            | 'parc'
            | 'chateau'
            | 'musee'
            | 'expo'
            | 'spectacle'
            | 'quartier'
            | 'tourisme_historique'
            | 'autre'
          image_url: string
          location?: string | null
          arrondissement?: string | null
          price_range?: 'gratuit' | 'euro' | 'euro2' | 'euro3' | null
          duration?: string | null
          tags?: Array<string> | null
          website?: string | null
          already_done?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?:
            | 'jardin'
            | 'parc'
            | 'chateau'
            | 'musee'
            | 'expo'
            | 'spectacle'
            | 'quartier'
            | 'tourisme_historique'
            | 'autre'
          image_url?: string
          location?: string | null
          arrondissement?: string | null
          price_range?: 'gratuit' | 'euro' | 'euro2' | 'euro3' | null
          duration?: string | null
          tags?: Array<string> | null
          website?: string | null
          already_done?: boolean
          created_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          user_id: string
          activity_id: string
          choice: 'like' | 'dislike'
          voted_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_id: string
          choice: 'like' | 'dislike'
          voted_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_id?: string
          choice?: 'like' | 'dislike'
          voted_at?: string
        }
      }
    }
    Views: {
      activity_rankings: {
        Row: {
          id: string
          name: string
          description: string | null
          category:
            | 'jardin'
            | 'parc'
            | 'chateau'
            | 'musee'
            | 'expo'
            | 'spectacle'
            | 'quartier'
            | 'tourisme_historique'
            | 'autre'
          image_url: string
          location: string | null
          arrondissement: string | null
          price_range: 'gratuit' | 'euro' | 'euro2' | 'euro3' | null
          duration: string | null
          tags: Array<string> | null
          website: string | null
          already_done: boolean
          created_at: string
          likes: number
          dislikes: number
          total_votes: number
          like_percentage: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
