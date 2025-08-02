import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rhlmftxipvxqlxdlvkvi.supabase.co'           // your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJobG1mdHhpcHZ4cWx4ZGx2a3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjY0OTIsImV4cCI6MjA2OTY0MjQ5Mn0.3oiT8RiT0ZPSN5E_DA9a09IYVwjPvGk1CI6wq1F0SOA'                   // your service role key for backend

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  // Example: fetch all users from 'users' table
  const { data, error } = await supabase
    .from('users')
    .select('*')

  if (error) {
    console.error('Error fetching users:', error)
  } else {
    console.log('Users:', data)
  }
}

main()
