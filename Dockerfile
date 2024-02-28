FROM --platform=linux/amd64 node:20.11.1-bullseye as base
RUN npm install -g pnpm

FROM --platform=linux/amd64 base as builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM --platform=linux/amd64 builder as prod
EXPOSE 3000
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY ./src .

CMD ["pnpm", "dev"]