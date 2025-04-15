// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbjqtfkqfikxbwfetniz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNianF0ZmtxZmlreGJ3ZmV0bml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTgwNjEsImV4cCI6MjA2MDI3NDA2MX0.-jSrPFqLXzy7PAqCksAEa8hIBbTLwJN5XMtfEml3iu8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
