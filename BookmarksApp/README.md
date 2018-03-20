# scalability-lab05: Bookmarks System

[![Build Status](https://travis-ci.org/auth0-eng-camp/scalability-lab05.svg?branch=postgres_rabbit_solution_by_nicopaez)](https://travis-ci.org/auth0-eng-camp/scalability-lab05)

This branch contains a possible solution for Bookmarks challenge. It is implemented with Postgresql and Rabbitmq.

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