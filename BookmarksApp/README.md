# Scalability Camp: Bookmarks App

This application consist in 3 components:

* A web API that exposes endpoints to manage bookmarks
* A scheduler worker app that send messages to a queue and periodically monitors the queue size
* A worker app that consumes the queue and process items


## Required infrastructure

The application depends on the following components:

* PostgreSQL
* RabbitMQ
* NodeJS

To create the required databased use the following commands:
```
CREATE DATABASE bookmarks;
CREATE ROLE bmuser WITH LOGIN PASSWORD 'password1'; 
GRANT ALL PRIVILEGES ON DATABASE bookmarks TO bmuser;
```

Then run the following command to populate the DB with the required tables: 

```
./node_modules/.bin/node-pg-migrate up
```