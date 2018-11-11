FROM node:10

WORKDIR /usr/app

COPY package.json .
COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "startup" ]
