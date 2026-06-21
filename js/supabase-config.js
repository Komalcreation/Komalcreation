import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://kmxnjnynjqtzjbtiuhdx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtteG5qbnluanF0empidGl1aGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwMDk1MzEsImV4cCI6MjA5NzU4NTUzMX0.9UEUP0RIydInJeDLqlIMZYGfSuJlW_8pdZ9tUIzKcMg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
