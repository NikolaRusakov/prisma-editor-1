FROM --platform=linux/amd64 node:hydrogen-alpine3.19 AS base
RUN apk add --no-cache libc6-compat openssl
RUN apk update
RUN npm install -g turbo pnpm next


FROM base AS builder
WORKDIR /app
COPY . .
RUN turbo prune --scope=@prisma-editor/web --docker

# SHELL ["/bin/bash", "-c"]
# ENV BASH_ENV ~/.bashrc
# ENV VOLTA_HOME /root/.volta
# ENV PATH $VOLTA_HOME/bin:$PATH
# ARG VOLTA_FEATURE_PNPM=1

# RUN curl https://get.volta.sh | bash
# RUN volta install pnpm

FROM base AS installer
ARG SKIP_ENV_VALIDATION=true
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm web postinstall

RUN next telemetry disable
RUN pnpm turbo run build --filter=@prisma-editor/web
CMD [ "pnpm","start" ] 

# TODO: fix Cannot find module 'next/dist/server/next-server' & remove CMD [ "pnpm","start" ] 
# FROM --platform=linux/amd64 node:16-alpine3.17 AS runner
# WORKDIR /app
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs
# COPY --from=installer /app/apps/web/next.config.mjs .
# COPY --from=installer /app/apps/web/package.json .
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone .
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
# CMD node server.js