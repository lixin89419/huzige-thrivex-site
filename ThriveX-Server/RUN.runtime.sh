#!/bin/sh
set -e

export DB_INFO="${DB_HOST}:${DB_PORT}/${DB_NAME}"

exec java -jar /server/app.jar
