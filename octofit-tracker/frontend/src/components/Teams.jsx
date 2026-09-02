import CollectionView from './CollectionView.jsx'

function Teams() {
  return <CollectionView collection="teams" title="Teams" emptyMessage="No teams created yet." renderItem={(team, index) => (
    <div className="col-md-6" key={team._id || index}>
      <article className="card h-100 border-0 shadow-sm"><div className="card-body">
        <h2 className="h5">{team.name}</h2><p className="text-secondary mb-0">{team.description || 'Fitness community'} · {team.members?.length || 0} members</p>
      </div></article>
    </div>
  )} />
}
export default Teams
