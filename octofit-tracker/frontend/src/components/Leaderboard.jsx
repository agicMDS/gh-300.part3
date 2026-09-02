import { useEffect, useState } from 'react'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` : 'http://localhost:8000/api/leaderboard/'
  useEffect(() => { fetch(endpoint).then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load leaderboard'))).then((response) => setEntries(Array.isArray(response) ? response : response.data || response.results || response.items || [])).catch((loadError) => setError(loadError.message)) }, [endpoint])
  return <section><h1 className="h2 mb-4">Leaderboard</h1>{error && <div className="alert alert-danger">{error}</div>}<div className="row g-3">{entries.map((entry, index) => <div className="col-md-6" key={entry._id || index}><article className="card h-100 border-0 shadow-sm"><div className="card-body d-flex align-items-center gap-3"><span className="display-6 fw-bold text-primary">#{entry.rank ?? index + 1}</span><div><h2 className="h5 mb-1">{entry.user?.profile?.firstName || entry.user?.username || 'Athlete'}</h2><p className="text-secondary mb-0">{entry.totalCalories ?? 0} calories · {entry.totalDuration ?? 0} min</p></div></div></article></div>)}</div></section>
}
export default Leaderboard
