#!/bin/bash


echo 'Configuring the database'

npx sequelize-cli db:create --env username=postgres,password=Gs!1034!psql_2023,host=postgres-db.cqctu22u9lwf.ap-south-1.rds.amazonaws.com,database=wisher,dialect=postgres

npx sequelize-cli db:migrate --env username=postgres,password=Gs!1034!psql_2023,host=postgres-db.cqctu22u9lwf.ap-south-1.rds.amazonaws.com,database=wisher,dialect=postgres

echo 'Successfuly configured the database'