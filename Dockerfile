FROM node:7.9.0-alpine
MAINTAINER zhangsihao <zhangsihao@1zhen.com>

ADD ./ /opt/db_http_port

WORKDIR /opt/db_http_port
RUN npm install

ENTRYPOINT ["npm run start"]

EXPOSE 7001