// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aimistcqlndneimalstl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpbWlzdGNxbG5kbmVpbWFsc3RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyMDA1NjIsImV4cCI6MjAwNTc3NjU2Mn0.qHDDDVAtqG37P0nS9dqzvX6VWSMX00KsV877YXgdf38';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
