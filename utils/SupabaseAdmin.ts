import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  );
  

export const addNewPrompt = async (options) => {
    return await supabaseAdmin
      .from("prompts")
      .insert(options)
      .select();
  };