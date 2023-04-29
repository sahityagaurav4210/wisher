FROM node:18

WORKDIR ./wisher

RUN npm install
RUN npm run init
RUN npm run migrate

EXPOSE 8083

CMD [ "npm","start" ]