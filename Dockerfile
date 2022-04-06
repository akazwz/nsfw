FROM node:buster-slim

WORKDIR /usr/app

RUN apt-get update && \
  apt-get install -y build-essential \
  wget \
  python3 \
  make \
  gcc \
  libc6-dev

COPY package.json ./

ENV NODE_ENV production

RUN yarn install --prod

COPY . .

RUN yarn build

EXPOSE 7000

CMD ["yarn", "start"]