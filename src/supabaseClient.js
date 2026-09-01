import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rwewxkmvphyaforhiory.supabase.co' ;
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3ZXd4a212cGh5YWZvcmhpb3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MTQ4MDMsImV4cCI6MjEwMTk5MDgwM30.QwvdFMvEISQOhualuU8G5Lfzkhxklok8j-WR_C4g5uI';


export const supabase = createClient(supabaseUrl, supabaseKey);