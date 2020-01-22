import { playerService } from '../services/player';
import { Socket, Server } from 'socket.io';
import { createLogger, LOG_NAMESPACE } from '../../utils/debug';
import { PLAYER_IDS_BY_TEAM, ALL_TEAMS } from '../services/player/constants';
import { playersDatastore } from '../datastore/players';
import { Player } from '../services/player/types';

const SUBSCRIBE_TO_ALL_PLAYERS = 'SUBSCRIBE_TO_ALL_PLAYERS';
const ALL_PLAYERS_UPDATE = 'ALL_PLAYERS_UPDATE';
const ADD_PLAYER = 'ADD_PLAYER';
const UPDATE_PLAYER = 'UPDATE_PLAYER';

const log = createLogger('players', LOG_NAMESPACE.socket);

const sortByPlayerName = (a: Player, b: Player) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const getChineseZodiacFromTag = (tags: string[]): string => {
  const zodiac = tags.find(t => t.startsWith('chinese_zodiac:'));

  return zodiac ? zodiac.split(':')[1] : '';
}

export const getPlayerImageUrl = (playerId: string, tags: string[]): string => {
  const zodiacSign = getChineseZodiacFromTag(tags);
  return zodiacSign ? `/zodiac/chinese-zodiac-${zodiacSign}.gif` : `/players/${playerId}.png`;
}

const getUpdatedPlayerList = (): Promise<any> => {
  return new Promise<any>(resolve => {
    playerService.getPlayersAsync().then(allPlayers => {
      const playerViews = allPlayers.map(player => {
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
          avatarImageUrl: getPlayerImageUrl(player.id, player.tags),
        };
      });

      resolve(playerViews.sort(sortByPlayerName));
    });
  });
};

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function (socket: Socket) {
    log('someone connected to players', socket.id);

    socket.on(SUBSCRIBE_TO_ALL_PLAYERS, () => {
      log('Received', SUBSCRIBE_TO_ALL_PLAYERS);
      getUpdatedPlayerList().then(playerList => {
        socket.emit(ALL_PLAYERS_UPDATE, playerList);
      });
    });

    socket.on(
      ADD_PLAYER,
      (id: string, name: string, avatarImageUrl: string) => {
        log('Received', ADD_PLAYER);
        log('Adding Player: ', id, name, avatarImageUrl);
        const player: Player = {
          id,
          name,
          avatarImageUrl,
          tags: [],
        };
        playersDatastore.addPlayer(player).then(() => {
          getUpdatedPlayerList().then(playerList => {
            socket.emit(ALL_PLAYERS_UPDATE, playerList);
          });
        });
      }
    );

    socket.on(UPDATE_PLAYER, (id: string, tags: string[]) => {
      log('Received', UPDATE_PLAYER);
      log('Updating Player: ', id, tags);
      playerService.getPlayer(id).then(player => {
        playerService.updatePlayerTags(player, tags).then(() => {
          getUpdatedPlayerList().then(playerList => {
            socket.emit(ALL_PLAYERS_UPDATE, playerList);
          });
        });
      });
    });
  });
};

export default init;
