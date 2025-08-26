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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      application_assignments: {
        Row: {
          application_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          application_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          application_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_assignments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          name: string
          status: Database["public"]["Enums"]["app_status"]
          updated_at: string
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name: string
          status?: Database["public"]["Enums"]["app_status"]
          updated_at?: string
          url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name?: string
          status?: Database["public"]["Enums"]["app_status"]
          updated_at?: string
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          allergies: string | null
          booking_date: string
          booking_type: string | null
          business_id: string | null
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          duration: number | null
          end_time: string
          hair_type: string | null
          id: string
          party_size: number
          restaurant_id: string | null
          service_id: string | null
          skin_type: string | null
          special_requests: string | null
          staff_id: string | null
          start_time: string
          status: string | null
          stylist_preference: string | null
          table_id: string | null
          treatment_type: string | null
          updated_at: string | null
        }
        Insert: {
          allergies?: string | null
          booking_date: string
          booking_type?: string | null
          business_id?: string | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          duration?: number | null
          end_time: string
          hair_type?: string | null
          id?: string
          party_size: number
          restaurant_id?: string | null
          service_id?: string | null
          skin_type?: string | null
          special_requests?: string | null
          staff_id?: string | null
          start_time: string
          status?: string | null
          stylist_preference?: string | null
          table_id?: string | null
          treatment_type?: string | null
          updated_at?: string | null
        }
        Update: {
          allergies?: string | null
          booking_date?: string
          booking_type?: string | null
          business_id?: string | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          duration?: number | null
          end_time?: string
          hair_type?: string | null
          id?: string
          party_size?: number
          restaurant_id?: string | null
          service_id?: string | null
          skin_type?: string | null
          special_requests?: string | null
          staff_id?: string | null
          start_time?: string
          status?: string | null
          stylist_preference?: string | null
          table_id?: string | null
          treatment_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      business_users: {
        Row: {
          business_id: string | null
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_users_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          admin_name: string | null
          background_image_url: string | null
          business_id: string
          business_type: Database["public"]["Enums"]["business_type"] | null
          contact_email: string | null
          created_at: string
          created_by: string
          crm_id: string | null
          crm_sync_status: string | null
          crm_synced_at: string | null
          domain: string | null
          id: string
          industry: string | null
          is_active: boolean | null
          name: string
          slug: string
          status: string
          template: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          admin_name?: string | null
          background_image_url?: string | null
          business_id: string
          business_type?: Database["public"]["Enums"]["business_type"] | null
          contact_email?: string | null
          created_at?: string
          created_by: string
          crm_id?: string | null
          crm_sync_status?: string | null
          crm_synced_at?: string | null
          domain?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          name: string
          slug: string
          status?: string
          template?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          admin_name?: string | null
          background_image_url?: string | null
          business_id?: string
          business_type?: Database["public"]["Enums"]["business_type"] | null
          contact_email?: string | null
          created_at?: string
          created_by?: string
          crm_id?: string | null
          crm_sync_status?: string | null
          crm_synced_at?: string | null
          domain?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          name?: string
          slug?: string
          status?: string
          template?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_tags: {
        Row: {
          business_id: string | null
          contact_id: string | null
          created_at: string
          customer_id: string | null
          id: string
          tag: string
        }
        Insert: {
          business_id?: string | null
          contact_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          tag: string
        }
        Update: {
          business_id?: string | null
          contact_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_tags_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_tags_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_tags_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string
          customer_id: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          status: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          status?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          status?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          business_id: string | null
          conversation_data: Json
          created_at: string
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          id: string
          session_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          business_id?: string | null
          conversation_data?: Json
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          session_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          business_id?: string | null
          conversation_data?: Json
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          session_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          booking_date: string | null
          booking_id: string | null
          booking_time: string | null
          business_id: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          industry: string | null
          last_booking_date: string | null
          last_name: string | null
          name: string
          notes: string | null
          party_size: number | null
          phone: string | null
          restaurant_id: string | null
          restaurant_name: string | null
          revenue: number | null
          source: string | null
          source_customer_id: string | null
          source_database_id: string | null
          special_requests: string | null
          status: string
          total_bookings: number | null
          total_spent: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          booking_date?: string | null
          booking_id?: string | null
          booking_time?: string | null
          business_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          industry?: string | null
          last_booking_date?: string | null
          last_name?: string | null
          name: string
          notes?: string | null
          party_size?: number | null
          phone?: string | null
          restaurant_id?: string | null
          restaurant_name?: string | null
          revenue?: number | null
          source?: string | null
          source_customer_id?: string | null
          source_database_id?: string | null
          special_requests?: string | null
          status?: string
          total_bookings?: number | null
          total_spent?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          booking_date?: string | null
          booking_id?: string | null
          booking_time?: string | null
          business_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          industry?: string | null
          last_booking_date?: string | null
          last_name?: string | null
          name?: string
          notes?: string | null
          party_size?: number | null
          phone?: string | null
          restaurant_id?: string | null
          restaurant_name?: string | null
          revenue?: number | null
          source?: string | null
          source_customer_id?: string | null
          source_database_id?: string | null
          special_requests?: string | null
          status?: string
          total_bookings?: number | null
          total_spent?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          close_date: string | null
          created_at: string
          customer_id: string | null
          deal_type: string | null
          id: string
          notes: string | null
          probability: number | null
          stage: string
          title: string
          updated_at: string
          user_id: string
          value: number | null
        }
        Insert: {
          close_date?: string | null
          created_at?: string
          customer_id?: string | null
          deal_type?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: string
          title: string
          updated_at?: string
          user_id: string
          value?: number | null
        }
        Update: {
          close_date?: string | null
          created_at?: string
          customer_id?: string | null
          deal_type?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: string
          title?: string
          updated_at?: string
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      email_campaign_recipients: {
        Row: {
          bounced_at: string | null
          campaign_id: string | null
          clicked_at: string | null
          contact_id: string | null
          created_at: string
          customer_id: string | null
          delivered_at: string | null
          email: string
          id: string
          name: string | null
          opened_at: string | null
          sent_at: string | null
          status: string | null
          tracking_id: string | null
          unsubscribed_at: string | null
          updated_at: string
        }
        Insert: {
          bounced_at?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          contact_id?: string | null
          created_at?: string
          customer_id?: string | null
          delivered_at?: string | null
          email: string
          id?: string
          name?: string | null
          opened_at?: string | null
          sent_at?: string | null
          status?: string | null
          tracking_id?: string | null
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          bounced_at?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          contact_id?: string | null
          created_at?: string
          customer_id?: string | null
          delivered_at?: string | null
          email?: string
          id?: string
          name?: string | null
          opened_at?: string | null
          sent_at?: string | null
          status?: string | null
          tracking_id?: string | null
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaign_recipients_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaign_recipients_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          business_id: string | null
          content: string
          created_at: string
          created_by: string | null
          id: string
          merge_fields: Json | null
          name: string
          scheduled_at: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["campaign_status"]
          subject: string
          target_contacts: Json | null
          target_segments: Json | null
          template_id: string | null
          total_bounced: number | null
          total_clicked: number | null
          total_delivered: number | null
          total_opened: number | null
          total_recipients: number | null
          total_sent: number | null
          total_unsubscribed: number | null
          updated_at: string
        }
        Insert: {
          business_id?: string | null
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          merge_fields?: Json | null
          name: string
          scheduled_at?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          subject: string
          target_contacts?: Json | null
          target_segments?: Json | null
          template_id?: string | null
          total_bounced?: number | null
          total_clicked?: number | null
          total_delivered?: number | null
          total_opened?: number | null
          total_recipients?: number | null
          total_sent?: number | null
          total_unsubscribed?: number | null
          updated_at?: string
        }
        Update: {
          business_id?: string | null
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          merge_fields?: Json | null
          name?: string
          scheduled_at?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          subject?: string
          target_contacts?: Json | null
          target_segments?: Json | null
          template_id?: string | null
          total_bounced?: number | null
          total_clicked?: number | null
          total_delivered?: number | null
          total_opened?: number | null
          total_recipients?: number | null
          total_sent?: number | null
          total_unsubscribed?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          business_id: string | null
          content: string
          created_at: string
          created_by: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          merge_fields: Json | null
          name: string
          subject: string
          template_type: Database["public"]["Enums"]["template_type"]
          updated_at: string
        }
        Insert: {
          business_id?: string | null
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          merge_fields?: Json | null
          name: string
          subject: string
          template_type?: Database["public"]["Enums"]["template_type"]
          updated_at?: string
        }
        Update: {
          business_id?: string | null
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          merge_fields?: Json | null
          name?: string
          subject?: string
          template_type?: Database["public"]["Enums"]["template_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      email_tracking_events: {
        Row: {
          campaign_id: string | null
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          recipient_id: string | null
          tracking_id: string
          user_agent: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          recipient_id?: string | null
          tracking_id: string
          user_agent?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          recipient_id?: string | null
          tracking_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_tracking_events_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_tracking_events_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "email_campaign_recipients"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_data: {
        Row: {
          company_size: string | null
          completed_at: string
          created_at: string
          id: string
          industry: string | null
          purpose: string
          referral_sources: string[] | null
          role: string | null
          team_size: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_size?: string | null
          completed_at?: string
          created_at?: string
          id?: string
          industry?: string | null
          purpose: string
          referral_sources?: string[] | null
          role?: string | null
          team_size?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_size?: string | null
          completed_at?: string
          created_at?: string
          id?: string
          industry?: string | null
          purpose?: string
          referral_sources?: string[] | null
          role?: string | null
          team_size?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_runs: {
        Row: {
          error_message: string | null
          id: string
          product_id: string
          run_at: string
          run_by: string
          success: boolean
        }
        Insert: {
          error_message?: string | null
          id?: string
          product_id: string
          run_at?: string
          run_by: string
          success?: boolean
        }
        Update: {
          error_message?: string | null
          id?: string
          product_id?: string
          run_at?: string
          run_by?: string
          success?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "product_runs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          run_count: number
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          run_count?: number
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          run_count?: number
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          business_name: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          primary_role: Database["public"]["Enums"]["app_role"] | null
          role: Database["public"]["Enums"]["app_role"] | null
          subscription_name:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          subscription_price: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          business_name?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          primary_role?: Database["public"]["Enums"]["app_role"] | null
          role?: Database["public"]["Enums"]["app_role"] | null
          subscription_name?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          subscription_price?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          business_name?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          primary_role?: Database["public"]["Enums"]["app_role"] | null
          role?: Database["public"]["Enums"]["app_role"] | null
          subscription_name?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          subscription_price?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          status: string
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      record_manager: {
        Row: {
          created_at: string
          google_drive_file_id: string
          hash: string
          id: number
        }
        Insert: {
          created_at?: string
          google_drive_file_id: string
          hash: string
          id?: number
        }
        Update: {
          created_at?: string
          google_drive_file_id?: string
          hash?: string
          id?: number
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          address: string
          business_id: string | null
          created_at: string | null
          cuisine: string
          description: string | null
          email: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          opening_hours: Json | null
          phone: string | null
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          address: string
          business_id?: string | null
          created_at?: string | null
          cuisine: string
          description?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          opening_hours?: Json | null
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          business_id?: string | null
          created_at?: string | null
          cuisine?: string
          description?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          opening_hours?: Json | null
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          role_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          role_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          role_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          address: string
          business_id: string | null
          created_at: string
          created_by: string | null
          customer_name: string
          estimated_cost: number | null
          id: string
          issue: string
          phone: string
          scheduled_time: string | null
          status: string
          technician_zone: string | null
          updated_at: string
          urgency: string
        }
        Insert: {
          address: string
          business_id?: string | null
          created_at?: string
          created_by?: string | null
          customer_name: string
          estimated_cost?: number | null
          id?: string
          issue: string
          phone: string
          scheduled_time?: string | null
          status?: string
          technician_zone?: string | null
          updated_at?: string
          urgency?: string
        }
        Update: {
          address?: string
          business_id?: string | null
          created_at?: string
          created_by?: string | null
          customer_name?: string
          estimated_cost?: number | null
          id?: string
          issue?: string
          phone?: string
          scheduled_time?: string | null
          status?: string
          technician_zone?: string | null
          updated_at?: string
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          business_id: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          price: number | null
          service_type: string | null
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          price?: number | null
          service_type?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          price?: number | null
          service_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      site_configurations: {
        Row: {
          created_at: string | null
          crm_config: Json | null
          domain: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          site_name: string
          site_type: Database["public"]["Enums"]["business_type"]
          subdomain: string | null
          theme_config: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          crm_config?: Json | null
          domain?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          site_name: string
          site_type: Database["public"]["Enums"]["business_type"]
          subdomain?: string | null
          theme_config?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          crm_config?: Json | null
          domain?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          site_name?: string
          site_type?: Database["public"]["Enums"]["business_type"]
          subdomain?: string | null
          theme_config?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          business_id: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          phone: string | null
          role: string
          schedule: Json | null
          specialties: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          phone?: string | null
          role: string
          schedule?: Json | null
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          phone?: string | null
          role?: string
          schedule?: Json | null
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean | null
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean | null
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean | null
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          billing_interval: string | null
          created_at: string
          description: string
          features: string[]
          id: string
          is_popular: boolean | null
          name: Database["public"]["Enums"]["subscription_tier"]
          price: number
          updated_at: string
        }
        Insert: {
          billing_interval?: string | null
          created_at?: string
          description: string
          features: string[]
          id?: string
          is_popular?: boolean | null
          name: Database["public"]["Enums"]["subscription_tier"]
          price: number
          updated_at?: string
        }
        Update: {
          billing_interval?: string | null
          created_at?: string
          description?: string
          features?: string[]
          id?: string
          is_popular?: boolean | null
          name?: Database["public"]["Enums"]["subscription_tier"]
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      tables: {
        Row: {
          business_id: string | null
          capacity: number
          created_at: string | null
          id: string
          name: string
          section: string
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          capacity: number
          created_at?: string | null
          id?: string
          name: string
          section: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          capacity?: number
          created_at?: string | null
          id?: string
          name?: string
          section?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tables_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          joined_at: string
          team_id: string
          user_id: string
        }
        Insert: {
          joined_at?: string
          team_id: string
          user_id: string
        }
        Update: {
          joined_at?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
        }
        Relationships: []
      }
      tenants: {
        Row: {
          brand_color: string | null
          created_at: string
          created_by: string | null
          cta_text: string | null
          cta_url: string | null
          from_email: string
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          updated_at: string
        }
        Insert: {
          brand_color?: string | null
          created_at?: string
          created_by?: string | null
          cta_text?: string | null
          cta_url?: string | null
          from_email: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          brand_color?: string | null
          created_at?: string
          created_by?: string | null
          cta_text?: string | null
          cta_url?: string | null
          from_email?: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      trade: {
        Row: {
          client_notes: string | null
          created_at: string
          date: string | null
          duration: string | null
          email: string | null
          id: number
          name: string | null
          phone: string | null
          service: string | null
          subject: string | null
          time: string | null
          treatment: string | null
        }
        Insert: {
          client_notes?: string | null
          created_at?: string
          date?: string | null
          duration?: string | null
          email?: string | null
          id?: number
          name?: string | null
          phone?: string | null
          service?: string | null
          subject?: string | null
          time?: string | null
          treatment?: string | null
        }
        Update: {
          client_notes?: string | null
          created_at?: string
          date?: string | null
          duration?: string | null
          email?: string | null
          id?: number
          name?: string | null
          phone?: string | null
          service?: string | null
          subject?: string | null
          time?: string | null
          treatment?: string | null
        }
        Relationships: []
      }
      user_product_assignments: {
        Row: {
          assigned_by: string
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          assigned_by: string
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          assigned_by?: string
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_product_assignments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          id: string
          subscription_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          subscription_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          subscription_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_add_user_role: {
        Args: {
          new_role: Database["public"]["Enums"]["app_role"]
          target_user_id: string
        }
        Returns: boolean
      }
      admin_create_user: {
        Args: {
          user_business_name?: string
          user_email: string
          user_first_name?: string
          user_last_name?: string
          user_password: string
          user_role?: Database["public"]["Enums"]["app_role"]
        }
        Returns: Json
      }
      admin_delete_user_complete: {
        Args:
          | { admin_user_id: string; target_user_id: string }
          | { target_user_id: string }
        Returns: boolean
      }
      admin_delete_user_profile: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      admin_get_all_users: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          email: string
          email_confirmed_at: string
          id: string
          last_sign_in_at: string
        }[]
      }
      admin_remove_user_role: {
        Args: {
          role_to_remove: Database["public"]["Enums"]["app_role"]
          target_user_id: string
        }
        Returns: boolean
      }
      admin_update_business_type: {
        Args: {
          business_id_param: string
          new_business_type: Database["public"]["Enums"]["business_type"]
        }
        Returns: boolean
      }
      admin_update_user_profile: {
        Args: {
          new_business_name?: string
          new_first_name?: string
          new_last_name?: string
          target_user_id: string
        }
        Returns: Json
      }
      admin_update_user_role: {
        Args: {
          new_role: Database["public"]["Enums"]["app_role"]
          target_user_id: string
        }
        Returns: boolean
      }
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      delete_user: {
        Args: { user_id: string }
        Returns: undefined
      }
      delete_user_account: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_business_customers: {
        Args: { business_slug: string }
        Returns: {
          created_at: string
          customer_id: string
          email: string
          first_name: string
          last_booking_date: string
          last_name: string
          phone: string
          total_bookings: number
        }[]
      }
      get_cheapest_subscription_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_site_config: {
        Args: { p_domain?: string; p_subdomain?: string }
        Returns: {
          crm_config: Json
          features: Json
          id: string
          logo_url: string
          primary_color: string
          secondary_color: string
          site_name: string
          site_type: Database["public"]["Enums"]["business_type"]
          theme_config: Json
        }[]
      }
      get_user_primary_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { content: string; content_type: string; uri: string }
          | { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { data: Json; uri: string } | { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { content: string; content_type: string; uri: string }
          | { data: Json; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      increment_campaign_clicks: {
        Args: { campaign_id: string }
        Returns: undefined
      }
      increment_campaign_delivered: {
        Args: { campaign_id: string }
        Returns: undefined
      }
      increment_campaign_opens: {
        Args: { campaign_id: string }
        Returns: undefined
      }
      is_admin: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      is_business_admin: {
        Args: { business_id_param: string; user_uuid?: string }
        Returns: boolean
      }
      is_business_owner: {
        Args: { business_id_param: string; user_id_param: string }
        Returns: boolean
      }
      is_super_admin: {
        Args: { user_uuid?: string }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      log_security_event: {
        Args:
          | { description: string; event_type: string; user_id?: string }
          | {
              p_action: string
              p_new_values?: Json
              p_old_values?: Json
              p_record_id?: string
              p_table_name?: string
            }
        Returns: undefined
      }
      match_documents: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      migrate_customers_to_businesses: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      test_crm_connection: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "business" | "user"
      app_status: "pending" | "approved" | "rejected"
      application_status: "pending" | "approved" | "rejected"
      business_type:
        | "beauty"
        | "restaurant"
        | "chauffeur"
        | "trade"
        | "business"
      campaign_status:
        | "draft"
        | "scheduled"
        | "sending"
        | "sent"
        | "paused"
        | "cancelled"
      subscription_tier: "basic" | "advanced" | "professional"
      template_type: "drag_drop" | "html" | "plain_text"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
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
    Enums: {
      app_role: ["admin", "business", "user"],
      app_status: ["pending", "approved", "rejected"],
      application_status: ["pending", "approved", "rejected"],
      business_type: ["beauty", "restaurant", "chauffeur", "trade", "business"],
      campaign_status: [
        "draft",
        "scheduled",
        "sending",
        "sent",
        "paused",
        "cancelled",
      ],
      subscription_tier: ["basic", "advanced", "professional"],
      template_type: ["drag_drop", "html", "plain_text"],
    },
  },
} as const
