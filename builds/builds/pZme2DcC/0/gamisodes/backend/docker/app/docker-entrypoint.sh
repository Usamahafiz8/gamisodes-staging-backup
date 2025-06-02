#!/bin/sh

npm run migrations:run

npm run seed:run

npm run build

npm run start:prod
