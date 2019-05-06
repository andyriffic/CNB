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
  
      console.log('STATS ADDED', data);
    });
  
  }
}

