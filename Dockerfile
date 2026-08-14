FROM node:26-alpine AS build
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm rebuild @swc/core esbuild

COPY . .
RUN pnpm run build

FROM node:26-alpine AS production
WORKDIR /app

RUN npm install -g serve

COPY --from=build --chown=node:node /app/dist ./dist

USER node

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
