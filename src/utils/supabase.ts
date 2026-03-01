import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://abgmuinhysscwpjyxxef.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZ211aW5oeXNzY3dwanl4eGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjcxNTksImV4cCI6MjA4NzkwMzE1OX0.0OFr8bV4tD1eCYKExRDzVEkh9tKWnLZwH-wejnhu5iE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
