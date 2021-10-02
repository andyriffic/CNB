import AWS from 'aws-sdk';

import {
  STATS_AWS_ACCESS_KEY_ID,
  STATS_AWS_SECRET_ACCESS_KEY,
} from '../environment';

const s3 = new AWS.S3({
  accessKeyId: STATS_AWS_ACCESS_KEY_ID,
  secretAccessKey: STATS_AWS_SECRET_ACCESS_KEY,
  apiVersion: '2006-03-01',
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
  getRacingStats: (gameId, bucket) => {
    const params = {
      Bucket: bucket,
      Prefix: gameId
    };

    return new Promise((resolve, reject) => {
      s3.listObjectsV2(params, (err, data) => {
        if (err) {
          console.log('ERROR ADDING STATS', err, err.stack);
          reject();
        } else {
          const allFileKeys = data.Contents.map(d => d.Key);

          if (allFileKeys.length === 0) {
            resolve([]);
          }
          console.log('keys:', allFileKeys);
          const concatData = {};

          allFileKeys.forEach(key => {
            s3.getObject({Bucket: bucket, Key: key}, (err, data) => {
              if (err) {
                console.log('ERROR getting stats file:', key, err);
                return;
              }

              console.log('FILE DATA', key, JSON.parse(data.Body.toString('utf-8')));
              concatData[key] = JSON.parse(data.Body.toString('utf-8'));


              if (Object.keys(concatData).length === allFileKeys.length) {
                let sortedData = [];
                allFileKeys.forEach(dataKey => {
                  sortedData.push(concatData[dataKey])
                })
                resolve(sortedData.flat());
              }
            })
          })

        }
      })
    })
  }
};
