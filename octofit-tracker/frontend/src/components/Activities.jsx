import { useEffect, useState } from 'react'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'
  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load activities')))
      .then((response) => setActivities(Array.isArray(response) ? response : response.data || response.results || response.items || []))
      .catch((loadError) => setError(loadError.message))
  }, [endpoint])
  return <section><h1 className="h2 mb-4">Activities</h1>{error && <div className="alert alert-danger">{error}</div>}<div className="row g-3">{activities.map((activity, index) => <div className="col-md-6" key={activity._id || index}><article className="card h-100 border-0 shadow-sm"><div className="card-body"><span className="badge text-bg-success mb-2">{activity.type}</span><h2 className="h5">{activity.duration} minutes</h2><p className="text-secondary mb-0">{activity.distance ?? 0} km · {activity.calories ?? 0} calories</p></div></article></div>)}</div></section>
}
export default Activities
