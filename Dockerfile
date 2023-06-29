# Stage 1: Build client
FROM node:14 as client-builder

WORKDIR /app/client

COPY ./client/package*.json ./

RUN npm ci --production

COPY ./client .

RUN npm run build

# Stage 2: Build server
FROM node:14 as server-builder

WORKDIR /app/server

COPY ./server/package*.json ./

RUN npm ci --production

COPY ./server .

# Stage 3: Production image
FROM node:14-alpine

WORKDIR /app

COPY --from=client-builder /app/client/build ./client/build
COPY --from=server-builder /app/server .

EXPOSE 3000
EXPOSE 5000

CMD ["npm", "run", "start"]
