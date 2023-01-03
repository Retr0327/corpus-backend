FROM node:18-bullseye as builder

WORKDIR /app

RUN yarn global add pnpm

RUN pnpm config set auto-install-peers t

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

RUN pnpm install pm2

COPY . /app

RUN pnpm build

FROM node:18-bullseye as release 

RUN apt-get update && apt -y upgrade 

RUN apt-get install -y dnsutils build-essential && apt-get clean

RUN yarn global add pnpm

RUN pnpm config set auto-install-peers true

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/deployment ./deployment 