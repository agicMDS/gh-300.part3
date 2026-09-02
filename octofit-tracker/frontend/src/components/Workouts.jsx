import CollectionView from './CollectionView.jsx'

function Workouts() {
  return <CollectionView collection="workouts" title="Workouts" emptyMessage="No workouts available yet." renderItem={(workout, index) => (
    <div className="col-md-6" key={workout._id || index}>
      <article className="card h-100 border-0 shadow-sm"><div className="card-body">
        <span className="badge text-bg-warning mb-2">{workout.difficulty}</span><h2 className="h5">{workout.name}</h2><p className="text-secondary mb-0">{workout.description || 'Personalized training plan'} · {workout.duration || 0} min</p>
      </div></article>
    </div>
  )} />
}
export default Workouts
