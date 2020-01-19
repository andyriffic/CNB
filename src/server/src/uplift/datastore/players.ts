import {
  putDynamoDbItem,
  scanDynamoTable,
  getItemById,
  updateDynamoDbItem,
} from '../aws/dynamodb';
import { DYNAMO_DB_PLAYERS_TABLE_NAME } from '../../environment';
import { Player } from '../services/player/types';

const addPlayer = (player: Player): Promise<Player> => {
  return putDynamoDbItem(DYNAMO_DB_PLAYERS_TABLE_NAME, player);
};

const getAllPlayers = (): Promise<Player[]> => {
  return scanDynamoTable(
    DYNAMO_DB_PLAYERS_TABLE_NAME,
    'id, #n, tags, avatarImageUrl',
    { ['#n']: 'name' }
  );
};

const getPlayer = (id: string): Promise<Player> => {
  return getItemById<Player>(DYNAMO_DB_PLAYERS_TABLE_NAME, id).then(player => {
    return player;
  });
};

const updatePlayerTags = (player: Player): Promise<Player> => {
  return updateDynamoDbItem(
    DYNAMO_DB_PLAYERS_TABLE_NAME,
    player.id,
    'set #t = :t',
    { '#t': 'tags' },
    {
      ':t': player.tags,
    }
  );
};

export const playersDatastore = {
  getAllPlayers,
  addPlayer,
  updatePlayerTags,
  getPlayer,
};
