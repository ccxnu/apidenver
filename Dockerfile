FROM node:20-slim AS base

ENV DIR=/app
WORKDIR $DIR

#########################
# BUILD FOR PRODUCTION
#########################

FROM base AS build

RUN apt-get update && apt-get install -y dumb-init

# Copiar los archivos de la aplicación
COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src src
COPY public public
COPY docs docs

RUN npm run build && \
    npm prune --production

#########################
# PRODUCTION
#########################

FROM base AS production

ENV NODE_ENV=production
ENV USER=node
RUN mkdir -p /app/data

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules node_modules
COPY --from=build $DIR/package*.json ./
COPY --from=build $DIR/public public
COPY --from=build $DIR/docs docs
COPY --from=build $DIR/dist dist

# Crear directorio para SQLite
RUN mkdir -p /app/data && chown -R node:node /app/data

USER $USER
EXPOSE 3000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist/main.js"]
