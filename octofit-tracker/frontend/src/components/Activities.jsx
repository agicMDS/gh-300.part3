import CollectionView from './CollectionView.jsx'

function Activities() {
  return <CollectionView collection="activities" title="Activities" emptyMessage="No activities recorded yet." renderItem={(activity, index) => (
    <div className="col-md-6" key={activity._id || index}>
      <article className="card h-100 border-0 shadow-sm"><div className="card-body">
        <span className="badge text-bg-success mb-2">{activity.type}</span>
        <h2 className="h5">{activity.duration} minutes</h2>
        <p className="text-secondary mb-0">{activity.distance ?? 0} km · {activity.calories ?? 0} calories</p>
      </div></article>
    </div>
  )} />
}
export default Activities
