function App() {
  return (
    <main className="container py-5">
      <div className="card shadow-sm border-0">
        <div className="card-body text-center">
          <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
          <p className="lead text-muted mb-4">
            Multi-tier fitness tracking application
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <span className="badge bg-primary-subtle text-primary-emphasis px-3 py-2">
              React 19
            </span>
            <span className="badge bg-success-subtle text-success-emphasis px-3 py-2">
              Express + TypeScript
            </span>
            <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2">
              MongoDB
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
