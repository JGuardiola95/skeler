FROM node:20.10.0-buster

USER node

RUN mkdir /home/node/src

WORKDIR /home/node/src

COPY --chown=node:node . .

RUN pnpm install

CMD [ "node", "index.js" ]