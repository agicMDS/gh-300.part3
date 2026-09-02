import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container"><NavLink className="navbar-brand fw-bold" to="/">OctoFit Tracker</NavLink>
          <div className="navbar-nav flex-row gap-3 flex-wrap">
            {[['Users', '/users'], ['Activities', '/activities'], ['Teams', '/teams'], ['Leaderboard', '/leaderboard'], ['Workouts', '/workouts']].map(([label, path]) => <NavLink key={path} className="nav-link" to={path}>{label}</NavLink>)}
          </div>
        </div>
      </nav>
      <main className="container py-5"><Routes>
        <Route path="/" element={<Navigate to="/activities" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/activities" replace />} />
      </Routes></main>
    </>
  )
}

export default App
