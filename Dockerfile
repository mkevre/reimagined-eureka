# This Dockerfile can be used for docker-based deployments to platforms
# like Now or Moda, but it is currently _not_ used by our Heroku deployments
# It uses two multi-stage builds: `install` and the main build to keep the image size down.

# --------------------------------------------------------------------------------
# BASE IMAGE
# --------------------------------------------------------------------------------
FROM node:16.2.0-alpine as base

RUN apk add --no-cache make g++ git

WORKDIR /usr/src/docs


# ---------------
# ALL DEPS
# ---------------
FROM base as all_deps

COPY package*.json ./

RUN npm ci


# ---------------
# PROD DEPS
# ---------------
FROM all_deps as prod_deps

RUN npm prune --production


# ---------------
# BUILDER
# ---------------
FROM all_deps as builder

ENV NODE_ENV production

COPY javascripts ./javascripts
COPY stylesheets ./stylesheets
COPY pages ./pages
COPY components ./components
COPY lib ./lib

# one part of the build relies on this content file to pull all-products
COPY content/index.md ./content/index.md

COPY webpack.config.js ./webpack.config.js
COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json

RUN npx tsc

# We need to copy data in order to do the build
COPY --chown=node:node data ./data

RUN npm run build

# --------------------------------------------------------------------------------
# MAIN IMAGE
# --------------------------------------------------------------------------------

FROM node:16.2.0-alpine as production

# Let's make our home
WORKDIR /usr/src/docs

# Ensure our node user owns the directory we're using
RUN chown node:node /usr/src/docs -R

# This should be our normal running user
USER node

# Copy just our prod dependencies
COPY --chown=node:node --from=prod_deps /usr/src/docs/node_modules /usr/src/docs/node_modules

# Copy our front-end code
COPY --chown=node:node --from=builder /usr/src/docs/dist /usr/src/docs/dist
COPY --chown=node:node --from=builder /usr/src/docs/.next /usr/src/docs/.next

# We should always be running in production mode
ENV NODE_ENV production

# Use Lunr instead of Algolia
ENV AIRGAP true

# Copy only what's needed to run the server
COPY --chown=node:node assets ./assets
COPY --chown=node:node content ./content
COPY --chown=node:node includes ./includes
COPY --chown=node:node layouts ./layouts
COPY --chown=node:node lib ./lib
COPY --chown=node:node middleware ./middleware
COPY --chown=node:node translations ./translations
COPY --chown=node:node server.js ./server.js
COPY --chown=node:node package*.json ./
COPY --chown=node:node feature-flags.json ./

EXPOSE 80
EXPOSE 443
EXPOSE 4000
CMD ["node", "server.js"]
