import { createClient } from "@supabase/supabase-js";
import { env } from "process";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
