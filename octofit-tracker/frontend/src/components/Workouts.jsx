import { useEffect, useState } from 'react'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : 'http://localhost:8000/api/workouts/'
  useEffect(() => { fetch(endpoint).then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load workouts'))).then((response) => setWorkouts(Array.isArray(response) ? response : response.data || response.results || response.items || [])).catch((loadError) => setError(loadError.message)) }, [endpoint])
  return <section><h1 className="h2 mb-4">Workouts</h1>{error && <div className="alert alert-danger">{error}</div>}<div className="row g-3">{workouts.map((workout, index) => <div className="col-md-6" key={workout._id || index}><article className="card h-100 border-0 shadow-sm"><div className="card-body"><span className="badge text-bg-warning mb-2">{workout.difficulty}</span><h2 className="h5">{workout.name}</h2><p className="text-secondary mb-0">{workout.description || 'Personalized training plan'} · {workout.duration || 0} min</p></div></article></div>)}</div></section>
}
export default Workouts
