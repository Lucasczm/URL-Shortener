FROM node:14.15.5-alpine As development

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apk add g++ make python
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install process-nextick-args && \
    npm install --only=development

COPY . .

RUN npm run test && \
    npm run test:e2e && \
    npm run build

FROM node:14.15.5-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
