FROM node:4.2

MAINTAINER Christopher Glantschnig <christopher.glantschnig@gmail.com>

RUN mkdir /server

RUN npm install gulp-cli mocha -g

WORKDIR /server
ADD package.json /server/package.json
RUN npm install

EXPOSE 3000

# CMD npm start
CMD npm test
# CMD gulp
