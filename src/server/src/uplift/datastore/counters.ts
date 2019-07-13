import { putDynamoDbItem, scanDynamoTable } from '../aws/dynamodb';
import { Counter } from '../services/counter/types';

const DYNAMO_DB_TABLE_NAME = 'cnb-counters-dev'; //TODO: Get from environment

const saveNewCounter = (counter: Counter): Promise<Counter> => {
  return putDynamoDbItem(DYNAMO_DB_TABLE_NAME, counter);
};

const getCounter = (): Promise<Counter> => {
  return scanDynamoTable(DYNAMO_DB_TABLE_NAME, 'id');
};

export const counterDatastore = {
  saveNewCounter,
  getCounter,
};
