/**
 * Supabase Client Configuration & Initialization
 * Imports the Supabase JS library from CDN using native ES6 Module syntax (+esm).
 * Replace placeholder values with your actual project URL and Anon/Public Key.
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// IMPORTANT: Replace these strings with your Supabase credentials
const SUPABASE_URL = 'url';
const SUPABASE_ANON_KEY = 'your key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
