export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      PersonalInformation: {
        Row: {
          age: number;
          contactNumber: string;
          country: string;
          firstName: string;
          gender: string;
          id: number;
          lastName: string;
          state: string;
          street: string;
          userId: string | null;
          zip: string;
        };
        Insert: {
          age: number;
          contactNumber: string;
          country: string;
          firstName: string;
          gender: string;
          id?: number;
          lastName: string;
          state: string;
          street: string;
          userId?: string | null;
          zip: string;
        };
        Update: {
          age?: number;
          contactNumber?: string;
          country?: string;
          firstName?: string;
          gender?: string;
          id?: number;
          lastName?: string;
          state?: string;
          street?: string;
          userId?: string | null;
          zip?: string;
        };
        Relationships: [
          {
            foreignKeyName: "PersonalInformation_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      TodoList: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          priorityLevel: string | null;
          title: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          priorityLevel?: string | null;
          title?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          priorityLevel?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      User: {
        Row: {
          id: number;
          userId: string | null;
          username: string;
        };
        Insert: {
          id?: number;
          userId?: string | null;
          username: string;
        };
        Update: {
          id?: number;
          userId?: string | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "User_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
export type Table<
  T extends keyof Database["public"]["Tables"],
  U extends keyof Database["public"]["Tables"][T]
> = Database["public"]["Tables"][T][U];

export type Test = Database["public"]["Tables"]["TodoList"]["Row"];
export type Row<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];