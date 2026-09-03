import DataPage from './DataPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const teamsApiEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  return (
    <DataPage
      title="Teams"
      resource="teams"
      endpoint={teamsApiEndpoint}
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'members', label: 'Members' },
        { key: 'points', label: 'Points' },
      ]}
      emptyMessage="No teams have been created yet."
    />
  );
}

export default Teams;