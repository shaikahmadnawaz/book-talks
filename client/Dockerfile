# Stage 1

FROM node:14-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Stage 2

FROM node:14-alpine as runner

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "start"]

# To build the Docker image, run the following command from the client directory:
# docker build -t react-client .