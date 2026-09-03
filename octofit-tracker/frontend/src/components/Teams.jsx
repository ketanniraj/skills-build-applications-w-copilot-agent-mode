import DataPage from './DataPage.jsx';

function Teams() {
  return (
    <DataPage
      title="Teams"
      resource="teams"
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