import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

export default function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('users').select('*')
      if (error) console.error(error)
      else setUsers(data)
    }

    fetchUsers()
  }, [])
 
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user)=>
            <li key={user.id}>{user.full_name}</li>
        )}
      </ul>
    </div>
  )
}
