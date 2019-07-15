import AWS, { AWSError } from 'aws-sdk';
import {
  ScanInput,
  ScanOutput,
  PutItemInput,
  PutItemOutput,
  GetItemInput,
  GetItemOutput,
} from 'aws-sdk/clients/dynamodb';

import {
  STATS_AWS_ACCESS_KEY_ID,
  STATS_AWS_SECRET_ACCESS_KEY,
} from '../../environment';

AWS.config.update({
  region: 'ap-southeast-2',
  accessKeyId: STATS_AWS_ACCESS_KEY_ID,
  secretAccessKey: STATS_AWS_SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

export function getItemById<T>(tableName: string, id: string): Promise<T> {
  const params: GetItemInput = {
    TableName: tableName,
    Key: {
      // @ts-ignore (Typescript definition doesn't work if used as intended, e.g. id: { S: id })
      id, 
    },
  };

  const promise = new Promise<T>((resolve, reject) => {
    docClient.get(params, (err: AWSError, data: GetItemOutput) => {
      if (err) {
        console.log(err);
        reject('Error getting item');
      } else if (!data.Item) {
        reject('Item not found');
      } else {
        resolve((<unknown>data.Item!) as T);
      }
    });
  });

  return promise;
}

export const putDynamoDbItem = (tableName: string, item: any): Promise<any> => {
  const params: PutItemInput = {
    TableName: tableName,
    Item: item,
  };

  const promise = new Promise<any>((resolve, reject) => {
    docClient.put(params, (err: AWSError, data: PutItemOutput) => {
      if (err) {
        console.log(err);
        reject('Error adding item');
      } else {
        resolve(data);
      }
    });
  });

  return promise;
};

export const scanDynamoTable = (
  tableName: string,
  attributeValues: string
): Promise<any> => {
  const params: ScanInput = {
    TableName: tableName,
    ProjectionExpression: attributeValues,
  };

  const promise = new Promise<any>((resolve, reject) => {
    docClient.scan(params, createScan(resolve, reject));
  });

  return promise;
};

function createScan(
  resolve: (value?: any) => void,
  reject: (reason?: any) => void
) {
  return function onScan(err: AWSError, data: ScanOutput) {
    if (err) {
      console.log(err);
      reject('Unable to scan the table.');
    } else {
      resolve(data.Items);
    }
  };
}
