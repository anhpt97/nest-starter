FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn global add pm2 && yarn --prod && yarn build

CMD ["pm2-runtime", "dist/main.js", "-i", "max"]
