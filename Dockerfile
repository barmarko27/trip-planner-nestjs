###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:23-alpine AS development

ENV NODE_ENV development

# Prisma expects openssl to be installed
RUN apk update && apk add openssl

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

COPY --chown=node:node yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################


FROM node:23-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

COPY --chown=node:node yarn.lock ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn install --frozen-lockfile --production=true && yarn cache clean

RUN yarn build

USER node

###################
# PRODUCTION
###################

FROM node:23-alpine AS production

ENV NODE_ENV production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]