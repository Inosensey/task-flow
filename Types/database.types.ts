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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      LocationCategories: {
        Row: {
          category: string | null
          created_at: string
          id: number
          keyId: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: number
          keyId?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: number
          keyId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "LocationCategories_keyId_fkey"
            columns: ["keyId"]
            isOneToOne: false
            referencedRelation: "LocationKeys"
            referencedColumns: ["id"]
          }
        ]
      }
      LocationKeys: {
        Row: {
          created_at: string
          description: string | null
          id: number
          key: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          key?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          key?: string | null
        }
        Relationships: []
      }
      PersonalInformation: {
        Row: {
          age: number
          contactNumber: string
          country: string
          firstName: string
          gender: string
          id: number
          lastName: string
          state: string
          street: string
          userId: string | null
          zip: string
        }
        Insert: {
          age: number
          contactNumber: string
          country: string
          firstName: string
          gender: string
          id?: number
          lastName: string
          state: string
          street: string
          userId?: string | null
          zip: string
        }
        Update: {
          age?: number
          contactNumber?: string
          country?: string
          firstName?: string
          gender?: string
          id?: number
          lastName?: string
          state?: string
          street?: string
          userId?: string | null
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "PersonalInformation_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ScheduleLocation: {
        Row: {
          categoryKey: number | null
          categoryKeyId: number | null
          city: string | null
          cityId: string | null
          created_at: string
          id: number
          lat: number | null
          long: number | null
          namePlace: string | null
          scheduleId: number | null
        }
        Insert: {
          categoryKey?: number | null
          categoryKeyId?: number | null
          city?: string | null
          cityId?: string | null
          created_at?: string
          id?: number
          lat?: number | null
          long?: number | null
          namePlace?: string | null
          scheduleId?: number | null
        }
        Update: {
          categoryKey?: number | null
          categoryKeyId?: number | null
          city?: string | null
          cityId?: string | null
          created_at?: string
          id?: number
          lat?: number | null
          long?: number | null
          namePlace?: string | null
          scheduleId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ScheduleLocation_categoryKey_fkey"
            columns: ["categoryKey"]
            isOneToOne: false
            referencedRelation: "LocationCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ScheduleLocation_categoryKeyId_fkey"
            columns: ["categoryKeyId"]
            isOneToOne: false
            referencedRelation: "LocationKeys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ScheduleLocation_scheduleId_fkey"
            columns: ["scheduleId"]
            isOneToOne: false
            referencedRelation: "Schedules"
            referencedColumns: ["id"]
          }
        ]
      }
      Schedules: {
        Row: {
          created_at: string
          date: string | null
          description: string | null
          id: number
          themeColor: string | null
          timeEnd: string | null
          timeStart: string | null
          title: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: number
          themeColor?: string | null
          timeEnd?: string | null
          timeStart?: string | null
          title?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: number
          themeColor?: string | null
          timeEnd?: string | null
          timeStart?: string | null
          title?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Schedules_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      TodoList: {
        Row: {
          created_at: string
          description: string | null
          id: number
          priorityLevel: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          priorityLevel?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          priorityLevel?: string | null
          title?: string | null
        }
        Relationships: []
      }
      User: {
        Row: {
          id: number
          userId: string | null
          username: string
        }
        Insert: {
          id?: number
          userId?: string | null
          username: string
        }
        Update: {
          id?: number
          userId?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "User_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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

export type Table<
  T extends keyof Database["public"]["Tables"],
  U extends keyof Database["public"]["Tables"][T]
> = Database["public"]["Tables"][T][U];

export type TableInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TableRow<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TableUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
