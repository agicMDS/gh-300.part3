import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function CollectionView({ collection, title, renderItem, emptyMessage }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchCollection(collection)
      .then((data) => active && setItems(data))
      .catch((loadError) => active && setError(loadError.message))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [collection])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-uppercase small fw-bold text-primary mb-1">OctoFit Tracker</p>
          <h1 className="h2 mb-0">{title}</h1>
        </div>
        <span className="badge text-bg-dark">{items.length} records</span>
      </div>
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && items.length === 0 && <div className="alert alert-secondary">{emptyMessage}</div>}
      <div className="row g-3">{items.map((item, index) => renderItem(item, index))}</div>
    </section>
  )
}

export default CollectionView
