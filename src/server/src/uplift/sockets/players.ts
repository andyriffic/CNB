import { playerService } from '../services/player';
import { Socket, Server } from 'socket.io';
import { createLogger, LOG_NAMESPACE } from '../../utils/debug';
import { PLAYER_IDS_BY_TEAM, ALL_TEAMS } from '../services/player/constants';

const SUBSCRIBE_TO_ALL_PLAYERS = 'SUBSCRIBE_TO_ALL_PLAYERS';
const ALL_PLAYERS_UPDATE = 'ALL_PLAYERS_UPDATE';

const log = createLogger('players', LOG_NAMESPACE.socket);

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    log('someone connected to players', socket.id);

    socket.on(SUBSCRIBE_TO_ALL_PLAYERS, () => {
      log('Received', SUBSCRIBE_TO_ALL_PLAYERS);
      playerService.getPlayersAsync().then(players => {
        const playerViews = players.map(player => {
          const playerTeams = Object.keys(PLAYER_IDS_BY_TEAM)
            .map(teamId => {
              return PLAYER_IDS_BY_TEAM[teamId].includes(player.id)
                ? ALL_TEAMS.find(team => team.id === teamId)!.name
                : null;
            })
            .filter(teamName => teamName !== null);
          return {
            ...player,
            teams: playerTeams,
            avatarImageUrl: `/players/${player.id}.png`
          };
        });
        socket.emit(ALL_PLAYERS_UPDATE, playerViews);
      });
    });
  });
};

export default init;
