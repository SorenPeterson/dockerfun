FROM node:latest

RUN apt-get -y update && npm 

CMD /usr/games/fortune -a | cowsay

