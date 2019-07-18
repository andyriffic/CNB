import {
  putDynamoDbItem,
  getItemById,
  updateDynamoDbItem,
} from '../aws/dynamodb';
import { Counter } from '../services/counter/types';

const DYNAMO_DB_TABLE_NAME = 'cnb-counters-dev'; //TODO: Get from environment

const saveNewCounter = (counter: Counter): Promise<Counter> => {
  return putDynamoDbItem(DYNAMO_DB_TABLE_NAME, counter);
};

const updateCounter = (counter: Counter): Promise<Counter> => {
  return updateDynamoDbItem(
    DYNAMO_DB_TABLE_NAME,
    counter.id,
    'set #v = :v',
    { '#v': 'value' },
    {
      ':v': counter.value,
    }
  );
};

const getCounter = (id: string): Promise<Counter> => {
  return getItemById(DYNAMO_DB_TABLE_NAME, id);
};

export const counterDatastore = {
  saveNewCounter,
  getCounter,
  updateCounter,
};
