// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vmmrkzgbjvejdnwmntyu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbXJremdianZlamRud21udHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDg0MjUsImV4cCI6MjA1NjQyNDQyNX0.GorzwkTRCPCWeiuwj8Bexwg0q6p-SdzGztfj5cywrEI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);