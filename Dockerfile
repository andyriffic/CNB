FROM node:10

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
COPY .babelrc .
COPY src ./src

RUN npm install
RUN npm run build
