import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  // eslint-disable-next-line no-console
  console.warn("Supabase env vars are missing. Contact form will not work until they are set.");
}

export const supabase = createClient(
  SUPABASE_URL ?? "",
  SUPABASE_PUBLISHABLE_KEY ?? "",
);
