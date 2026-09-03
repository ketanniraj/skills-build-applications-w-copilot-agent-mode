import DataPage from './DataPage.jsx';

function Activities() {
  return (
    <DataPage
      title="Activities"
      resource="activities"
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