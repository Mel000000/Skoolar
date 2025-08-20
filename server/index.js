import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.SUPABASE_URL      
const supabaseAnonKey = process.env.ANON_PUBLICKEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
