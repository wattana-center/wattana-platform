FROM node:alpine AS builder

WORKDIR /build
ENV NODE_OPTIONS=--max_old_space_size=2048
COPY . .
COPY /prod/.env ./
RUN yarn install
RUN yarn build

FROM node:alpine as runner

WORKDIR /usr/app

COPY --from=builder /build/.env ./
COPY --from=builder /build/package.json /build/yarn.lock ./
COPY --from=builder /build/.next ./.next/
COPY --from=builder /build/public ./public/
COPY --from=builder /build/next.config.js ./
COPY --from=builder /build/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "start"]
