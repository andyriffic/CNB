import AWS from 'aws-sdk';

import {
  STATS_AWS_ACCESS_KEY_ID,
  STATS_AWS_SECRET_ACCESS_KEY,
} from '../environment';

const https = require('https');
const agent = new https.Agent({
  keepAlive: true,
  maxSockets: Infinity,
  keepAliveMsecs: 3000
});

const s3 = new AWS.S3({
  accessKeyId: STATS_AWS_ACCESS_KEY_ID,
  secretAccessKey: STATS_AWS_SECRET_ACCESS_KEY,
  apiVersion: '2006-03-01',
  httpOptions: {
    agent
  }
});

export const statsS3Bucket = {
  saveStats: (bucket, filepath, jsonObj) => {
    const params = {
      Body: JSON.stringify(jsonObj),
      Bucket: bucket,
      Key: filepath,
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        console.log('ERROR ADDING STATS', err, err.stack);
        return;
      }

      // console.log('STATS ADDED', data);
    });
  },
  getRacingStatSummary: (gameId, bucket) => {
    const params = {
      Bucket: bucket,
      Prefix: gameId
    };

    return new Promise((resolve, reject) => {
      s3.listObjectsV2(params, (err, data) => {
        if (err) {
          console.log('ERROR ADDING STATS', err, err.stack);
          reject(err.message);
          return;
        } else {
          const allFileKeys = data.Contents
            .map(d => d.Key)
            .map(key => key.replace(`${gameId}/`, ''));
            
          resolve(allFileKeys);
        }
      })
    })
  },
  getRacingStatsFile: (gameId, key, bucket) => {
    return new Promise((resolve, reject) => {
      const fullKey = `${gameId}/${key}`;
      s3.getObject({Bucket: bucket, Key: fullKey}, (err, data) => {
        if (err) {
          console.log('ERROR getting stats file:', fullKey, err);
          reject(err.message);
          return;
        }
        let parsedData;
  
        try {
          parsedData = JSON.parse(data.Body.toString('utf-8'));
        } catch (err) {
          reject(err);
        }
  
        resolve(parsedData);
      })
    });
  }
};
