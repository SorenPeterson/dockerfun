FROM node:latest

RUN apt-get -y update && git clone https://github.com/sorenpeterson/dockerfun.git

CMD node dockerfun/test.js

