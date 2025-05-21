import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://tdyyeygvfojnebppxyug.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeXlleWd2Zm9qbmVicHB4eXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTUzOTMsImV4cCI6MjA2MzM5MTM5M30.yxmHcp5mAyHj5lGbCBN7mBrnVPcfHDkSJvd4-G3EoD4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 