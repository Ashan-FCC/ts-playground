# Builder stage
# This state compiles our TypeScript to get the javascript code

FROM node:14.3.0 AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN npm ci --quiet && npm run build

# Production stage
# This state compile get bcak the javascript code from the builder stage

FROM node:14.3.0-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

## We just need the build to execute the command

COPY --from=build /usr/src/app/build ./build