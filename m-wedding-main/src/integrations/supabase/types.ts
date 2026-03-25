export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      invitations: {
        Row: {
          id: string
          user_id: string
          template_id: string
          bride_name: string
          groom_name: string
          wedding_date: string | null
          venue: string
          slug: string | null
          builder_data: Record<string, unknown>
          status: string
          publish_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          template_id?: string
          bride_name?: string
          groom_name?: string
          wedding_date?: string | null
          venue?: string
          slug?: string | null
          builder_data?: Record<string, unknown>
          status?: string
          publish_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          template_id?: string
          bride_name?: string
          groom_name?: string
          wedding_date?: string | null
          venue?: string
          slug?: string | null
          builder_data?: Record<string, unknown>
          status?: string
          publish_status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          order_code: string
          user_id: string
          invitation_id: string
          package_code: string
          package_name: string
          amount: number
          currency: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_code: string
          user_id: string
          invitation_id: string
          package_code?: string
          package_name?: string
          amount: number
          currency?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_code?: string
          user_id?: string
          invitation_id?: string
          package_code?: string
          package_name?: string
          amount?: number
          currency?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      payment_logs: {
        Row: {
          id: string
          payment_id: string
          event_type: string
          payload: Record<string, unknown>
          created_at: string
        }
        Insert: {
          id?: string
          payment_id: string
          event_type: string
          payload?: Record<string, unknown>
          created_at?: string
        }
        Update: {
          id?: string
          payment_id?: string
          event_type?: string
          payload?: Record<string, unknown>
          created_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          id: string
          payment_code: string
          order_id: string
          user_id: string
          provider: string
          method: string
          amount: number
          currency: string
          status: string
          provider_transaction_id: string | null
          provider_order_id: string | null
          qr_code_url: string | null
          payment_url: string | null
          transfer_content: string | null
          bank_info: Record<string, unknown> | null
          raw_request_payload: Record<string, unknown>
          raw_callback_payload: Record<string, unknown>
          paid_at: string | null
          expired_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          payment_code: string
          order_id: string
          user_id: string
          provider: string
          method?: string
          amount: number
          currency?: string
          status?: string
          provider_transaction_id?: string | null
          provider_order_id?: string | null
          qr_code_url?: string | null
          payment_url?: string | null
          transfer_content?: string | null
          bank_info?: Record<string, unknown> | null
          raw_request_payload?: Record<string, unknown>
          raw_callback_payload?: Record<string, unknown>
          paid_at?: string | null
          expired_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          payment_code?: string
          order_id?: string
          user_id?: string
          provider?: string
          method?: string
          amount?: number
          currency?: string
          status?: string
          provider_transaction_id?: string | null
          provider_order_id?: string | null
          qr_code_url?: string | null
          payment_url?: string | null
          transfer_content?: string | null
          bank_info?: Record<string, unknown> | null
          raw_request_payload?: Record<string, unknown>
          raw_callback_payload?: Record<string, unknown>
          paid_at?: string | null
          expired_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
