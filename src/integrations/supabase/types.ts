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
      admin_users: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          new_values: Json | null
          old_values: Json | null
          record_id: string
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id: string
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      cars: {
        Row: {
          created_at: string
          engine_size: string | null
          fuel_type: string | null
          id: string
          inspection_due_date: string | null
          license_plate: string
          make: string | null
          mileage: number | null
          model: string | null
          notes: string | null
          registration_date: string | null
          sold_at: string | null
          status: string | null
          technical_approval_date: string | null
          transferred_at: string | null
          transferred_to: string | null
          updated_at: string
          user_id: string
          vin: string | null
          year: number | null
        }
        Insert: {
          created_at?: string
          engine_size?: string | null
          fuel_type?: string | null
          id?: string
          inspection_due_date?: string | null
          license_plate: string
          make?: string | null
          mileage?: number | null
          model?: string | null
          notes?: string | null
          registration_date?: string | null
          sold_at?: string | null
          status?: string | null
          technical_approval_date?: string | null
          transferred_at?: string | null
          transferred_to?: string | null
          updated_at?: string
          user_id: string
          vin?: string | null
          year?: number | null
        }
        Update: {
          created_at?: string
          engine_size?: string | null
          fuel_type?: string | null
          id?: string
          inspection_due_date?: string | null
          license_plate?: string
          make?: string | null
          mileage?: number | null
          model?: string | null
          notes?: string | null
          registration_date?: string | null
          sold_at?: string | null
          status?: string | null
          technical_approval_date?: string | null
          transferred_at?: string | null
          transferred_to?: string | null
          updated_at?: string
          user_id?: string
          vin?: string | null
          year?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          estimated_hours: number | null
          id: string
          labor_cost: number | null
          notes: string | null
          parts_cost: number | null
          service_request_id: string
          status: string | null
          total_price: number
          updated_at: string | null
          updated_by: string | null
          valid_until: string | null
          workshop_id: string
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          estimated_hours?: number | null
          id?: string
          labor_cost?: number | null
          notes?: string | null
          parts_cost?: number | null
          service_request_id: string
          status?: string | null
          total_price: number
          updated_at?: string | null
          updated_by?: string | null
          valid_until?: string | null
          workshop_id: string
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          estimated_hours?: number | null
          id?: string
          labor_cost?: number | null
          notes?: string | null
          parts_cost?: number | null
          service_request_id?: string
          status?: string | null
          total_price?: number
          updated_at?: string | null
          updated_by?: string | null
          valid_until?: string | null
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      service_messages: {
        Row: {
          created_at: string | null
          id: string
          is_internal: boolean | null
          message_text: string
          read_at: string | null
          sender_id: string
          sender_type: string
          service_request_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message_text: string
          read_at?: string | null
          sender_id: string
          sender_type: string
          service_request_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message_text?: string
          read_at?: string | null
          sender_id?: string
          sender_type?: string
          service_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_messages_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          car_make: string | null
          car_model: string | null
          car_year: number | null
          category: string | null
          created_at: string | null
          deleted_at: string | null
          description: string
          id: string
          license_plate: string | null
          preferred_date: string | null
          priority: string | null
          service_type: string
          status: string | null
          updated_at: string | null
          updated_by: string | null
          urgency: string | null
          user_id: string
          workshop_id: string | null
        }
        Insert: {
          car_make?: string | null
          car_model?: string | null
          car_year?: number | null
          category?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description: string
          id?: string
          license_plate?: string | null
          preferred_date?: string | null
          priority?: string | null
          service_type: string
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
          urgency?: string | null
          user_id: string
          workshop_id?: string | null
        }
        Update: {
          car_make?: string | null
          car_model?: string | null
          car_year?: number | null
          category?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string
          id?: string
          license_plate?: string | null
          preferred_date?: string | null
          priority?: string | null
          service_type?: string
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
          urgency?: string | null
          user_id?: string
          workshop_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      service_reviews: {
        Row: {
          created_at: string | null
          id: string
          rating: number
          review_text: string | null
          service_request_id: string
          user_id: string
          workshop_id: string
          would_recommend: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          rating: number
          review_text?: string | null
          service_request_id: string
          user_id: string
          workshop_id: string
          would_recommend?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          rating?: number
          review_text?: string | null
          service_request_id?: string
          user_id?: string
          workshop_id?: string
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "service_reviews_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: true
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      user_api_quotas: {
        Row: {
          date: string
          id: string
          request_count: number | null
          user_id: string
        }
        Insert: {
          date?: string
          id?: string
          request_count?: number | null
          user_id: string
        }
        Update: {
          date?: string
          id?: string
          request_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          email_notifications: boolean | null
          id: string
          marketing_emails: boolean | null
          push_notifications: boolean | null
          sms_notifications: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          marketing_emails?: boolean | null
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          marketing_emails?: boolean | null
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vegvesen_api_logs: {
        Row: {
          error_message: string | null
          id: string
          ip_address: unknown | null
          license_plate: string
          request_timestamp: string
          response_status: number | null
          success: boolean | null
          user_id: string
        }
        Insert: {
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          license_plate: string
          request_timestamp?: string
          response_status?: number | null
          success?: boolean | null
          user_id: string
        }
        Update: {
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          license_plate?: string
          request_timestamp?: string
          response_status?: number | null
          success?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      workshop_pricing_history: {
        Row: {
          changed_by: string
          created_at: string | null
          effective_date: string | null
          id: string
          new_price: number
          old_price: number | null
          reason: string | null
          service_type: string
          workshop_id: string
        }
        Insert: {
          changed_by: string
          created_at?: string | null
          effective_date?: string | null
          id?: string
          new_price: number
          old_price?: number | null
          reason?: string | null
          service_type: string
          workshop_id: string
        }
        Update: {
          changed_by?: string
          created_at?: string | null
          effective_date?: string | null
          id?: string
          new_price?: number
          old_price?: number | null
          reason?: string | null
          service_type?: string
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workshop_pricing_history_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshop_registrations: {
        Row: {
          address: string
          approved_at: string | null
          approved_by: string | null
          business_name: string
          city: string
          contact_email: string
          contact_person: string | null
          contact_phone: string | null
          description: string | null
          duplicate_check_key: string | null
          id: string
          operating_hours: Json | null
          org_number: string | null
          postal_code: string
          services: string[] | null
          status: string | null
          submitted_at: string | null
          website: string | null
        }
        Insert: {
          address: string
          approved_at?: string | null
          approved_by?: string | null
          business_name: string
          city: string
          contact_email: string
          contact_person?: string | null
          contact_phone?: string | null
          description?: string | null
          duplicate_check_key?: string | null
          id?: string
          operating_hours?: Json | null
          org_number?: string | null
          postal_code: string
          services?: string[] | null
          status?: string | null
          submitted_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string
          approved_at?: string | null
          approved_by?: string | null
          business_name?: string
          city?: string
          contact_email?: string
          contact_person?: string | null
          contact_phone?: string | null
          description?: string | null
          duplicate_check_key?: string | null
          id?: string
          operating_hours?: Json | null
          org_number?: string | null
          postal_code?: string
          services?: string[] | null
          status?: string | null
          submitted_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      workshop_users: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          role: string | null
          user_id: string
          workshop_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          role?: string | null
          user_id: string
          workshop_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          role?: string | null
          user_id?: string
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workshop_users_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshops: {
        Row: {
          address: string
          city: string
          contact_person: string | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          operating_hours: Json | null
          org_number: string | null
          phone: string | null
          postal_code: string
          rating: number | null
          services: string[] | null
          suspended_at: string | null
          suspension_reason: string | null
          updated_at: string | null
          updated_by: string | null
          website: string | null
        }
        Insert: {
          address: string
          city: string
          contact_person?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          operating_hours?: Json | null
          org_number?: string | null
          phone?: string | null
          postal_code: string
          rating?: number | null
          services?: string[] | null
          suspended_at?: string | null
          suspension_reason?: string | null
          updated_at?: string | null
          updated_by?: string | null
          website?: string | null
        }
        Update: {
          address?: string
          city?: string
          contact_person?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          operating_hours?: Json | null
          org_number?: string | null
          phone?: string | null
          postal_code?: string
          rating?: number | null
          services?: string[] | null
          suspended_at?: string | null
          suspension_reason?: string | null
          updated_at?: string | null
          updated_by?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_api_quota: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      create_workshop_from_registration: {
        Args: { registration_id: string }
        Returns: string
      }
      get_current_workshop_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          workshop_id: string
          role: string
        }[]
      }
      increment_api_quota: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      is_admin: {
        Args: { _user_id?: string }
        Returns: boolean
      }
      log_vegvesen_api_call: {
        Args: {
          user_uuid: string
          plate: string
          status_code: number
          error_msg?: string
          user_ip?: unknown
          call_success?: boolean
        }
        Returns: undefined
      }
      update_venue_sunshine_status: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
