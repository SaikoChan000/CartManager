# Setting up

## Start Database and apply migrations

docker compose up db dbmigration --build

__We include --build to rebuild the migrations into the migrations container__

## Run the NodeJS application

nodemon index.js
