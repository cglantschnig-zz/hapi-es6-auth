FROM node:4.2

MAINTAINER Christopher Glantschnig <christopher.glantschnig@gmail.com>

RUN mkdir /server

RUN npm install gulp-cli -g

WORKDIR /server
ADD package.json /server/package.json
RUN npm install

EXPOSE 3000

# no command set on purpose
# in case you want to set a command choose one of the below
# CMD npm start
# CMD npm test
# CMD gulp
