import { useEffect, useState } from 'react'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : 'http://localhost:8000/api/teams/'
  useEffect(() => { fetch(endpoint).then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load teams'))).then((response) => setTeams(Array.isArray(response) ? response : response.data || response.results || response.items || [])).catch((loadError) => setError(loadError.message)) }, [endpoint])
  return <section><h1 className="h2 mb-4">Teams</h1>{error && <div className="alert alert-danger">{error}</div>}<div className="row g-3">{teams.map((team, index) => <div className="col-md-6" key={team._id || index}><article className="card h-100 border-0 shadow-sm"><div className="card-body"><h2 className="h5">{team.name}</h2><p className="text-secondary mb-0">{team.description || 'Fitness community'} · {team.members?.length || 0} members</p></div></article></div>)}</div></section>
}
export default Teams
