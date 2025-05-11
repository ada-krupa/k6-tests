ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --ignore-scripts --frozen-lockfile

COPY . .

RUN yarn build
# remove development dependencies
RUN yarn install --production

# remove unnecessary npm - we are using yarn only
RUN rm -rf /usr/bin/npm /usr/lib/node_modules/npm /usr/local/lib/node_modules/npm

FROM node:${NODE_VERSION}-alpine

RUN apk --no-cache add curl bash && apk --no-cache upgrade

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG SERVICE_VERSION
ENV SERVICE_VERSION=$SERVICE_VERSION

WORKDIR /usr/src/app
COPY --from=build --chown=node:node /usr/src/app/package.json ./
COPY --from=build --chown=node:node /usr/src/app/yarn.lock ./
COPY --from=build --chown=node:node /usr/src/app/dist ./dist
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules

# remove unnecessary npm - we are using yarn only
RUN rm -rf /usr/bin/npm /usr/lib/node_modules/npm /usr/local/lib/node_modules/npm

USER node

CMD ["node", "dist/main"]
