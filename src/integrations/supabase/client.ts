// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pbkijsedtqatsmcgstqq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBia2lqc2VkdHFhdHNtY2dzdHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTQ1NzEsImV4cCI6MjA2MzA3MDU3MX0.2Jk8epGjnnepWLJkEwCA6nGATWq1sLdpsRfuor6K6gw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);