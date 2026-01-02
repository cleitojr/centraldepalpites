import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ujcmuvsbewqfplhasova.supabase.co'
const supabaseAnonKey = 'sb_publishable_rC5Owzph-wuE5Jf2QhmKpg_ZYiE9-K_'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
