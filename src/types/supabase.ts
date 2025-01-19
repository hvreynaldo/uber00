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
      leases: {
        Row: {
          id: string
          name: string
          type: string
          start_date: string
          end_date: string
          document_url: string | null
          description: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          start_date: string
          end_date: string
          document_url?: string | null
          description: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          start_date?: string
          end_date?: string
          document_url?: string | null
          description?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}