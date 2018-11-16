FROM node:10

WORKDIR /usr/app

COPY package.json .
COPY src ./src

ARG counter_api_base_url
ENV REACT_APP_COUNTER_API_BASE_URL=$counter_api_base_url

ARG is_production
ENV REACT_APP_PRODUCTION=$is_production

RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "startup" ]
