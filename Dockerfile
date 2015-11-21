FROM node:latest

RUN npm install -g socket.io

COPY test.js /test.js

CMD node test.js

