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
          zip?: string;
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
