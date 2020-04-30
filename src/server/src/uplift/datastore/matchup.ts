import { TeamMatchup } from '../services/matchup/types';
import { putDynamoDbItem, scanDynamoTable, getItemById } from '../aws/dynamodb';
import { DYNAMO_DB_MATCHUPS_TABLE_NAME } from '../../environment';

const saveNewMatchup = (matchup: TeamMatchup): Promise<TeamMatchup> => {
  return putDynamoDbItem(DYNAMO_DB_MATCHUPS_TABLE_NAME, matchup);
};

const getMatchup = (id: string): Promise<TeamMatchup> => {
  return getItemById<TeamMatchup>(DYNAMO_DB_MATCHUPS_TABLE_NAME, id).then(
    (matchup) => {
      return {
        ...matchup,
        trophyGoal: matchup.trophyGoal || 3,
      };
    }
  );
};

const getAllMatchups = (): Promise<TeamMatchup[]> => {
  return scanDynamoTable(
    DYNAMO_DB_MATCHUPS_TABLE_NAME,
    'id, teamIds, pointCounterIds, bonusCounterId'
  );
};

export const matchupDatastore = {
  saveNewMatchup,
  getAllMatchups,
  getMatchup,
};
