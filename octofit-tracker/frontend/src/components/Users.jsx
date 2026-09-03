import DataPage from './DataPage.jsx';

function Users() {
  return (
    <DataPage
      title="Users"
      resource="users"
      columns={[
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'team', label: 'Team' },
      ]}
      emptyMessage="No users were returned by the API."
    />
  );
}

export default Users;