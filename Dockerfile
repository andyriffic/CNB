FROM node:16.3.0-alpine

WORKDIR /usr/app

ARG counter_api_base_url
ENV REACT_APP_COUNTER_API_BASE_URL=$counter_api_base_url

ARG is_production
ENV REACT_APP_PRODUCTION=$is_production

ARG stats_api_base_url
ENV REACT_APP_STATS_API_BASE_URL=$stats_api_base_url

COPY package.json .

# server packages
COPY src/server/package.json ./src/server/package.json
COPY src/server/package-lock.json ./src/server/package-lock.json
RUN npm run install:server
COPY src/server ./src/server

# client packages
COPY src/client/package.json ./src/client/package.json
COPY src/client/package-lock.json ./src/client/package-lock.json
RUN npm run install:client
COPY src/client ./src/client

# client packages v2
COPY src/client-v2/package.json ./src/client-v2/package.json
COPY src/client-v2/package-lock.json ./src/client-v2/package-lock.json
RUN npm run install:client-v2
COPY src/client-v2 ./src/client-v2

RUN npm run build:docker

EXPOSE 3000
CMD [ "npm", "run", "startup" ]
