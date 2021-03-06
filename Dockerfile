FROM node:14-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk add bash nano
RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk add bash nano
RUN npm install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]