# Stage 1

FROM node:14-alpine as builder

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Stage 2

FROM node:14-alpine as runner

WORKDIR /app

COPY --from=builder /app .

EXPOSE 5000

CMD ["npm", "run", "dev"]