FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

ENV DB_HOST postgres
ENV DB_PASS Gs!1034!psql_2023
ENV HOST postgres-db.cqctu22u9lwf.ap-south-1.rds.amazonaws.com
ENV DB_NAME wisher
ENV PORT 8003
ENV DIALECT postgres
ENV DB_PORT 5432
ENV SERVHOST 0.0.0.0

RUN npm install

COPY . .

EXPOSE 8003

CMD ["./init.sh" ]
