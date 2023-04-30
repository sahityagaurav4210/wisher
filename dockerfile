FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

RUN chmod +rx ./init.sh ./start.sh

EXPOSE 8083

CMD ["./start.sh" ]
