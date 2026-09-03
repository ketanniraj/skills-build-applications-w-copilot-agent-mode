import DataPage from './DataPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const activitiesApiEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  return (
    <DataPage
      title="Activities"
      resource="activities"
      endpoint={activitiesApiEndpoint}
      columns={[
        { key: 'user', label: 'User' },
        { key: 'activity', label: 'Activity' },
        { key: 'duration', label: 'Duration' },
        { key: 'date', label: 'Date' },
      ]}
      emptyMessage="No activities have been logged yet."
    />
  );
}

export default Activities;