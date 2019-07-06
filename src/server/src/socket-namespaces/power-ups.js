import { getCounters } from '../power-ups/power-ups';

const PATH = '/game';
const EVENT_POWERUPS_UPDATE = 'POWERUPS_UPDATE';

let powerups = {};

const init = socketIo => {
  // const gameHistory = {};
  const namespace = socketIo.of(PATH);

  const refreshAndBroadcastPowerups = () => {
    getCounters(counters => {
      console.log('POWERUPS -----------', counters)
      powerups = counters;
      socketIo.of(PATH).emit(EVENT_POWERUPS_UPDATE, powerups);
    });
  };

  refreshAndBroadcastPowerups();

  namespace.on('connection', function(socket) {
    console.log('someone connected to powerups', socket.id);
    socket.emit(EVENT_POWERUPS_UPDATE, powerups);
  });
};

export default init;
