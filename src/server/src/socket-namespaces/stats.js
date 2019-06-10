import axios from 'axios';
import { publishStats } from '../stats/publishStats';

const PATH = '/stats';
const EVENT_LEADERBOARD_UPDATE = 'LEADERBOARD_UPDATE';
const EVENT_TRIGGER_STATS_REFRESH = 'TRIGGER_STATS_REFRESH';

let playerLeaderboard = {};

const fetchAndParseLeaderboardStats = () => {
  return axios.get(
    'https://s3-ap-southeast-2.amazonaws.com/cnb-stats-dev-results/players-by-points-ranking.json'
  );
};

const init = socketIo => {
  // const gameHistory = {};
  const namespace = socketIo.of(PATH);

  const refreshAndBroadcastStats = () => {
    fetchAndParseLeaderboardStats().then(({ data }) => {
      playerLeaderboard = data;
      socketIo.of(PATH).emit(EVENT_LEADERBOARD_UPDATE, playerLeaderboard);
    });
  };

  refreshAndBroadcastStats();

  namespace.on('connection', function(socket) {
    console.log('someone connected to stats', socket.id);
    socket.emit(EVENT_LEADERBOARD_UPDATE, playerLeaderboard);

    socket.on(EVENT_TRIGGER_STATS_REFRESH, function(socket) {
      console.log('REFRESH');
      Promise.all(publishStats()).then(() => {
        console.log('stats published');
        refreshAndBroadcastStats();
      });
    });
  });
};

export default init;
