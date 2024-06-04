import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hnotsviummtwoctipqjq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhub3Rzdml1bW10d29jdGlwcWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMjcwODMsImV4cCI6MjAzMjgwMzA4M30._vxN6DBUw7CZAjxWegvBctHOriUnbttYXN6U_7pLqqw";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
