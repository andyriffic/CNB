# Running it

## Full application

### docker

```
auto/start
```

### npm

```
npm run start
```

## Just client

```
cd src/client
npm install
npm start
```

TODO: a way to simulate the socket server?

## Publish image to AWS

Open file `~/.aws/credentials`
Add the following section

```
[andyriffic]
aws_access_key_id = GET_ME_FROM_SOMEONE_WHO_KNOWS
aws_secret_access_key = GET_ME_FROM_SOMEONE_WHO_KNOWS
```

You can then run the `auto/build-publish-container` command to publish the latest version
