import AWS, { AWSError } from 'aws-sdk';
import {
  ScanInput,
  ScanOutput,
  PutItemInput,
  PutItemOutput,
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

const getItem = (tableName: string, id: string) => {};

export const putDynamoDbItem = (tableName: string, item: any): Promise<any> => {
  const params: PutItemInput = {
    TableName: tableName,
    Item: item,
  };

  const promise = new Promise<any>((resolve, reject) => {
    docClient.put(params, (err: AWSError, data: PutItemOutput) => {
      if (err) {
        console.log(err);
        reject('Error adding matchup');
      } else {
        resolve(data);
      }
    });
  });

  return promise;
};

export const scanDynamoTable = (
  tableName: string,
  key: string
): Promise<any> => {
  const params: ScanInput = {
    TableName: tableName,
    ProjectionExpression: key,
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
