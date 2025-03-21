export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          xp: number
          streak_days: number
          last_daily_check: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          xp?: number
          streak_days?: number
          last_daily_check?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          xp?: number
          streak_days?: number
          last_daily_check?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      daily_tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          xp_reward: number
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          xp_reward?: number
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          xp_reward?: number
          category?: string
          created_at?: string
        }
      }
      task_logs: {
        Row: {
          id: string
          user_id: string
          task_id: string
          completed_at: string
          completion_date: string
          reflection: string | null
          mood: string | null
        }
        Insert: {
          id?: string
          user_id: string
          task_id: string
          completed_at?: string
          completion_date?: string
          reflection?: string | null
          mood?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          task_id?: string
          completed_at?: string
          completion_date?: string
          reflection?: string | null
          mood?: string | null
        }
      }
      user_insights: {
        Row: {
          id: string
          user_id: string
          category: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 