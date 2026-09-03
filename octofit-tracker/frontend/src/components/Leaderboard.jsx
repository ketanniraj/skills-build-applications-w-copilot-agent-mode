import DataPage from './DataPage.jsx';

function Leaderboard() {
  return (
    <DataPage
      title="Leaderboard"
      resource="leaderboard"
      columns={[
        { key: 'rank', label: 'Rank' },
        { key: 'user', label: 'User' },
        { key: 'team', label: 'Team' },
        { key: 'points', label: 'Points' },
      ]}
      emptyMessage="Leaderboard results are not available yet."
    />
  );
}

export default Leaderboard;