FROM node:20-alpine

RUN apk update && apk add --no-cache \
    build-base gcc autoconf automake \
    zlib-dev libpng-dev vips-dev git python3

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]