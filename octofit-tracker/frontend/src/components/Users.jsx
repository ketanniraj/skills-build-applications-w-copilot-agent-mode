import DataPage from './DataPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const usersApiEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  return (
    <DataPage
      title="Users"
      resource="users"
      endpoint={usersApiEndpoint}
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