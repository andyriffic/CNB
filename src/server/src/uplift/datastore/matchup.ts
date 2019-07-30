import { TeamMatchup } from '../services/matchup/types';
import { putDynamoDbItem, scanDynamoTable, getItemById } from '../aws/dynamodb';

const DYNAMO_DB_TABLE_NAME = 'cnb-matchups-dev'; //TODO: Get from environment

const saveNewMatchup = (matchup: TeamMatchup): Promise<TeamMatchup> => {
  return putDynamoDbItem(DYNAMO_DB_TABLE_NAME, matchup);
};

const getMatchup = (id: string): Promise<TeamMatchup> => {
  return getItemById<TeamMatchup>(DYNAMO_DB_TABLE_NAME, id).then(matchup => {
    return {
      ...matchup,
      trophyGoal: 2,
    };
  });
};

const getAllMatchups = (): Promise<TeamMatchup[]> => {
  return scanDynamoTable(DYNAMO_DB_TABLE_NAME, 'id, teamIds, pointCounterIds');
};

export const matchupDatastore = {
  saveNewMatchup,
  getAllMatchups,
  getMatchup,
};
