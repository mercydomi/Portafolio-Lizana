import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase is optional while developing the portfolio locally. Creating a
// client without these values throws during initial render and leaves a blank
// page, so only initialise it when the environment is configured.
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null
