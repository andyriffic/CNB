import { Socket, Server } from 'socket.io';
import { scanDynamoTable, putDynamoDbItem } from '../aws/dynamodb';
import { games } from '../services/matchup';
import shortid from 'shortid';

const MATCHUPS_UPDATE = 'MATCHUPS_UPDATE';

let cachedMatchups: any[] | null = null;

const resyncMatchups = (socket: Socket) => {
  scanDynamoTable('cnb-matchups-dev', 'id')
    .then(matchups => {
      cachedMatchups = matchups;
      socket.emit(MATCHUPS_UPDATE, cachedMatchups);
    })
    .catch(error => {
      console.log('Matchups error', error);
      return error;
    });
};

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    console.log('someone connected to MATCHUPS', socket.id);

    if (cachedMatchups) {
      console.log('Sending cached matchps', cachedMatchups);
      socket.emit(MATCHUPS_UPDATE, cachedMatchups);
    } else {
      resyncMatchups(socket);
    }

    socket.on('ADD_MATCHUP', (teamIds: [string, string]) => {
      const matchup = games.createTeamMatchup(shortid.generate(), teamIds);
      console.log('CREATING MATCHUP', matchup);
      putDynamoDbItem('cnb-matchups-dev', matchup).then(() => {
        resyncMatchups(socket);
      });
    });
  });
};

export default init;
