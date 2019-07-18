import { TeamMatchup } from '../services/matchup/types';
import { putDynamoDbItem, scanDynamoTable, getItemById } from '../aws/dynamodb';

const DYNAMO_DB_TABLE_NAME = 'cnb-matchups-dev'; //TODO: Get from environment

const saveNewMatchup = (matchup: TeamMatchup): Promise<TeamMatchup> => {
  return putDynamoDbItem(DYNAMO_DB_TABLE_NAME, matchup);
};

const getMatchup = (id: string): Promise<TeamMatchup> => {
  return getItemById(DYNAMO_DB_TABLE_NAME, id);
}

const getAllMatchups = (): Promise<TeamMatchup[]> => {
  return scanDynamoTable(DYNAMO_DB_TABLE_NAME, 'id, teamIds, pointCounterIds');
};

export const matchupDatastore = {
  saveNewMatchup,
  getAllMatchups,
  getMatchup,
};
