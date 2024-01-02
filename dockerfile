# Build stage
FROM node:20.10.0-alpine as build-stage

RUN npm install -g pnpm

# It is always safer to use the predefined node user instead of root.
USER node 

WORKDIR /home/node

COPY --chown=node:node pnpm-lock.yaml package.json ./

RUN pnpm install

COPY --chown=node:node . .

# Generate prisma stuff
RUN npx prisma generate

RUN pnpm run build

# Execution stage
FROM node:20.10.0-alpine 

WORKDIR /home/node

# Copiar solo el directorio build y node_modules necesarios para ejecutar la aplicación
COPY --from=build-stage /home/node/build /home/node/build
COPY --from=build-stage /home/node/node_modules /home/node/node_modules
COPY --from=build-stage /home/node/package.json /home/node/package.json
COPY --from=build-stage /home/node/.env /home/node/.env


EXPOSE 3333

CMD ["node", "-r", "module-alias/register", "--env-file=.env", "build/index.js"]
