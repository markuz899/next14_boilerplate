FROM node:16.17.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 1400

RUN npm run build

CMD npm run prod
