import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bandlnvnikvbbivifpmu.supabase.co";
const supabaseAnonKey = "sb_publishable_GStJQMU-htbCQeS7RZQGgw_IRlIVjYA";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);