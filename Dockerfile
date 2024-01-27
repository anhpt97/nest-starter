FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn --prod

CMD ["yarn", "start"]
