import DataPage from './DataPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const leaderboardApiEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  return (
    <DataPage
      title="Leaderboard"
      resource="leaderboard"
      endpoint={leaderboardApiEndpoint}
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