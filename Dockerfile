FROM node:lts-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY nitro.config.ts prisma ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --production

COPY . .

RUN pnpm build

FROM node:lts-alpine AS runner

ARG VERSION
ARG BUILD_TIME

ENV NODE_ENV=production
ENV NITRO_APP_VERSION=$VERSION

WORKDIR /app

COPY --from=builder /app/.output ./.output

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]