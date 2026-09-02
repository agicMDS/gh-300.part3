import CollectionView from './CollectionView.jsx'

function Users() {
  return <CollectionView collection="users" title="Athletes" emptyMessage="No athletes registered yet." renderItem={(user, index) => (
    <div className="col-md-6" key={user._id || index}>
      <article className="card h-100 border-0 shadow-sm"><div className="card-body">
        <h2 className="h5">{user.profile?.firstName} {user.profile?.lastName}</h2><p className="text-secondary mb-0">@{user.username} · {user.email}</p>
      </div></article>
    </div>
  )} />
}
export default Users
