FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

RUN npm install
RUN npx sequelize-cli db:create --env username=postgres,password=Gs!1034!psql_2023,host=postgres-db.cqctu22u9lwf.ap-south-1.rds.amazonaws.com,database=wisher,dialect=postgres

RUN npx sequelize-cli db:migrate --env username=postgres,password=Gs!1034!psql_2023,host=postgres-db.cqctu22u9lwf.ap-south-1.rds.amazonaws.com,database=wisher,dialect=postgres

COPY . .

EXPOSE 8083

CMD ["npm","start" ]
