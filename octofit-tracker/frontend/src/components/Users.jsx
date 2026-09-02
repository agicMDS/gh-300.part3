import { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` : 'http://localhost:8000/api/users/'
  useEffect(() => { fetch(endpoint).then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load users'))).then((response) => setUsers(Array.isArray(response) ? response : response.data || response.results || response.items || [])).catch((loadError) => setError(loadError.message)) }, [endpoint])
  return <section><h1 className="h2 mb-4">Athletes</h1>{error && <div className="alert alert-danger">{error}</div>}<div className="row g-3">{users.map((user, index) => <div className="col-md-6" key={user._id || index}><article className="card h-100 border-0 shadow-sm"><div className="card-body"><h2 className="h5">{user.profile?.firstName} {user.profile?.lastName}</h2><p className="text-secondary mb-0">@{user.username} · {user.email}</p></div></article></div>)}</div></section>
}
export default Users
