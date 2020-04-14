FROM node:12-alpine

RUN mkdir -p /usr/src/app && chown node /usr/src/app
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm i
RUN npm i react-scripts@3.4.1 -g

ENV NODE_ENV=development
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./public ./public

RUN npm run build

EXPOSE 3000