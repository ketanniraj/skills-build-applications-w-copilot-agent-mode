import DataPage from './DataPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const workoutsApiEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  return (
    <DataPage
      title="Workouts"
      resource="workouts"
      endpoint={workoutsApiEndpoint}
      columns={[
        { key: 'name', label: 'Workout' },
        { key: 'description', label: 'Description' },
        { key: 'difficulty', label: 'Difficulty' },
      ]}
      emptyMessage="No workout suggestions are available yet."
    />
  );
}

export default Workouts;