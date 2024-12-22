FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml prisma ./

RUN corepack enable

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

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