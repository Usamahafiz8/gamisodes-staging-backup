FROM node:18

WORKDIR /app

RUN npm i -g @nestjs/cli@10.1.11

COPY package.json package-lock.json ./

RUN npm i

ADD . .

RUN chmod +x ./docker/app/docker-entrypoint.sh

ENTRYPOINT [ "./docker/app/docker-entrypoint.sh" ]