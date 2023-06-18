import { SupabaseClient } from "@supabase/supabase-js";


export const fetchPrompts = async (supabase: SupabaseClient) => {
  return supabase.from("prompts").select().order('created_at', { ascending: false })
};