export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      generation_logs: {
        Row: {
          created_at: string
          event_type: string
          generation_id: string | null
          id: number
          message: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          generation_id?: string | null
          id?: never
          message: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          generation_id?: string | null
          id?: never
          message?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generation_logs_generation_id_fkey"
            columns: ["generation_id"]
            isOneToOne: false
            referencedRelation: "mock_generations"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_generations: {
        Row: {
          ai_model_used: string | null
          completed_at: string | null
          created_at: string
          credits_consumed: number
          error_message: string | null
          generated_data: Json
          generation_prompt: string | null
          generation_schema: Json | null
          generation_status: string
          generation_type: string
          id: string
          processing_time_ms: number | null
          record_count: number
          template_id: string | null
          user_id: string
        }
        Insert: {
          ai_model_used?: string | null
          completed_at?: string | null
          created_at?: string
          credits_consumed?: number
          error_message?: string | null
          generated_data: Json
          generation_prompt?: string | null
          generation_schema?: Json | null
          generation_status?: string
          generation_type: string
          id?: string
          processing_time_ms?: number | null
          record_count: number
          template_id?: string | null
          user_id: string
        }
        Update: {
          ai_model_used?: string | null
          completed_at?: string | null
          created_at?: string
          credits_consumed?: number
          error_message?: string | null
          generated_data?: Json
          generation_prompt?: string | null
          generation_schema?: Json | null
          generation_status?: string
          generation_type?: string
          id?: string
          processing_time_ms?: number | null
          record_count?: number
          template_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mock_generations_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "mock_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_templates: {
        Row: {
          created_at: string
          description: string | null
          generation_type: string
          id: string
          is_public: boolean
          json_schema: Json | null
          name: string
          prompt_description: string | null
          sample_size: number
          tags: string[] | null
          updated_at: string
          usage_count: number
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          generation_type?: string
          id?: string
          is_public?: boolean
          json_schema?: Json | null
          name: string
          prompt_description?: string | null
          sample_size?: number
          tags?: string[] | null
          updated_at?: string
          usage_count?: number
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          generation_type?: string
          id?: string
          is_public?: boolean
          json_schema?: Json | null
          name?: string
          prompt_description?: string | null
          sample_size?: number
          tags?: string[] | null
          updated_at?: string
          usage_count?: number
          user_id?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          created_at: string
          credits_available: number
          credits_used: number
          id: number
          last_purchase_amount: number | null
          last_purchase_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits_available?: number
          credits_used?: number
          id?: never
          last_purchase_amount?: number | null
          last_purchase_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits_available?: number
          credits_used?: number
          id?: never
          last_purchase_amount?: number | null
          last_purchase_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          plan_type: string
          stripe_customer_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          plan_type?: string
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          plan_type?: string
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_user_credits: {
        Args: {
          p_user_id: string
          p_credits_to_add: number
          p_purchase_amount?: number
        }
        Returns: undefined
      }
      consume_user_credits: {
        Args: { p_user_id: string; p_credits_needed?: number }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
