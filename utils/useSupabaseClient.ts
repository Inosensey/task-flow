import { createBrowserClient } from '@supabase/ssr'
import { env } from "process";
import { Database } from "../Types/database.types";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_ANON_KEY ?? "";

export const useSupabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
