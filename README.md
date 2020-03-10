# Running it

## Full application

### docker

```
auto/start
```

## Local dev

1. Open 2 terminal windows and run both Client and Server below...

### Client

1. open terminal to path `/src/client`
2. run `npm run start:local`

### Server

1. open terminal to path `/src/server`
2. get access keys to fill in following command:
3. run `DYNAMO_DB_PLAYERS_TABLE_NAME=cnb-players-dev DYNAMO_DB_MATCHUPS_TABLE_NAME=cnb-matchups-dev DYNAMO_DB_COUNTERS_TABLE_NAME=cnb-counters-dev STATS_ENABLED=true STATS_AWS_SOURCE_BUCKET_NAME=cnb-stats-dev STATS_AWS_RESULT_BUCKET_NAME=cnb-stats-dev-results STATS_AWS_ACCESS_KEY_ID=**ACCESS KEY ID** STATS_AWS_SECRET_ACCESS_KEY=**ACCESS KEY** STATS_AWS_ATHENA_DB_NAME=cnb_stats_dev npm run serve:local`

### Run

- **Spectator Mode:** http://localhost:3001
- **Player:** http://localhost:3001/play

Any dev in client will auto-update, any dev on server you'll need to restart the server by running server command above again

## Publish to prod

Open file `~/.aws/credentials`
Add the following section

```
[cnb]
aws_access_key_id = GET_ME_FROM_SOMEONE_WHO_KNOWS
aws_secret_access_key = GET_ME_FROM_SOMEONE_WHO_KNOWS
```

Then run `auto/deploy-prod` to deploy your current branch to prod.
