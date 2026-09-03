import DataPage from './DataPage.jsx';

function Workouts() {
  return (
    <DataPage
      title="Workouts"
      resource="workouts"
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