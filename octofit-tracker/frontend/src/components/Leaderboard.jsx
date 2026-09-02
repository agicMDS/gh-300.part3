import CollectionView from './CollectionView.jsx'

function Leaderboard() {
  return <CollectionView collection="leaderboard" title="Leaderboard" emptyMessage="No rankings available yet." renderItem={(entry, index) => (
    <div className="col-md-6" key={entry._id || index}>
      <article className="card h-100 border-0 shadow-sm"><div className="card-body d-flex align-items-center gap-3">
        <span className="display-6 fw-bold text-primary">#{entry.rank ?? index + 1}</span>
        <div><h2 className="h5 mb-1">{entry.user?.profile?.firstName || entry.user?.username || 'Athlete'}</h2><p className="text-secondary mb-0">{entry.totalCalories ?? 0} calories · {entry.totalDuration ?? 0} min</p></div>
      </div></article>
    </div>
  )} />
}
export default Leaderboard
