import AWS from 'aws-sdk';
import Queue from 'async/queue';
import _ from 'lodash';
import {
  STATS_AWS_ACCESS_KEY_ID,
  STATS_AWS_SECRET_ACCESS_KEY,
} from '../environment';
import { statsS3Bucket } from './s3';

const ATHENA_DB = 'cnb_stats_dev';
const ATHENA_OUTPUT_LOCATION = 's3://cnb-stats-dev/';
const RESULT_SIZE = 1000;
const POLL_INTERVAL = 1000;

const client = new AWS.Athena({
  region: 'ap-southeast-2',
  accessKeyId: STATS_AWS_ACCESS_KEY_ID,
  secretAccessKey: STATS_AWS_SECRET_ACCESS_KEY,
});

/* Create an async queue to handle polling for query results */
let q = Queue((id, cb) => {
  startPolling(id)
    .then(data => {
      return cb(null, data);
    })
    .catch(err => {
      console.log('Failed to poll query: ', err);
      return cb(err);
    });
}, 5);

const playersByPointsQuery = `SELECT player,
points
FROM 
(SELECT player1.player,
sum(player1.points) AS points
FROM "cnb_stats_dev"."cnb_stats_dev"
GROUP BY  player1.player
UNION ALL
SELECT player2.player,
sum(player2.points) AS points
FROM "cnb_stats_dev"."cnb_stats_dev"
GROUP BY  player2.player ) AS DistinctCodes (player, points)
WHERE player IS NOT NULL
ORDER BY  points DESC, player;`;

/* Make a SQL query and display results */
const runTestQuery = () => {
  makeQuery(playersByPointsQuery)
    .then(data => {
      console.log('Row Count: ', data.length);
      console.log('DATA: ', data);
      statsS3Bucket.saveStats({result: data}, 'results/players-by-points-ranking.json');
    })
    .catch(e => {
      console.log('ERROR: ', e);
    });
};

export const publishStats = () => {
  runTestQuery();
};

function makeQuery(sql) {
  return new Promise((resolve, reject) => {
    let params = {
      QueryString: sql,
      ResultConfiguration: { OutputLocation: ATHENA_OUTPUT_LOCATION },
      QueryExecutionContext: { Database: ATHENA_DB },
    };

    /* Make API call to start the query execution */
    client.startQueryExecution(params, (err, results) => {
      if (err) return reject(err);
      /* If successful, get the query ID and queue it for polling */
      q.push(results.QueryExecutionId, (err, qid) => {
        if (err) return reject(err);
        /* Once query completed executing, get and process results */
        return buildResults(qid)
          .then(data => {
            return resolve(data);
          })
          .catch(err => {
            return reject(err);
          });
      });
    });
  });
}

function buildResults(query_id, max, page) {
  let max_num_results = max ? max : RESULT_SIZE;
  let page_token = page ? page : undefined;
  return new Promise((resolve, reject) => {
    let params = {
      QueryExecutionId: query_id,
      MaxResults: max_num_results,
      NextToken: page_token,
    };

    let dataBlob = [];
    go(params);

    /* Get results and iterate through all pages */
    function go(param) {
      getResults(param)
        .then(res => {
          dataBlob = _.concat(dataBlob, res.list);
          if (res.next) {
            param.NextToken = res.next;
            return go(param);
          } else return resolve(dataBlob);
        })
        .catch(err => {
          return reject(err);
        });
    }

    /* Process results merging column names and values into a JS object */
    function getResults() {
      return new Promise((resolve, reject) => {
        client.getQueryResults(params, (err, data) => {
          if (err) return reject(err);
          var list = [];
          let header = buildHeader(data.ResultSet.ResultSetMetadata.ColumnInfo);
          let top_row = _.map(_.head(data.ResultSet.Rows).Data, n => {
            return n.VarCharValue;
          });
          let resultSet =
            _.difference(header, top_row).length > 0
              ? data.ResultSet.Rows
              : _.drop(data.ResultSet.Rows);
          resultSet.forEach(item => {
            list.push(
              _.zipObject(
                header,
                _.map(item.Data, n => {
                  return n.VarCharValue;
                })
              )
            );
          });
          return resolve({
            next: 'NextToken' in data ? data.NextToken : undefined,
            list: list,
          });
        });
      });
    }
  });
}

function startPolling(id) {
  return new Promise((resolve, reject) => {
    function poll(id) {
      client.getQueryExecution({ QueryExecutionId: id }, (err, data) => {
        if (err) return reject(err);
        if (data.QueryExecution.Status.State === 'SUCCEEDED')
          return resolve(id);
        else if (
          ['FAILED', 'CANCELLED'].includes(data.QueryExecution.Status.State)
        )
          return reject(new Error(`Query ${data.QueryExecution.Status.State}`));
        else {
          setTimeout(poll, POLL_INTERVAL, id);
        }
      });
    }
    poll(id);
  });
}

function buildHeader(columns) {
  return _.map(columns, i => {
    return i.Name;
  });
}
