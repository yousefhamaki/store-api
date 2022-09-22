# Store API Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate && db-migrate-pg from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- bcrypt from npm to hash password
- morgan from npm for loggen middleware
- helmet from npm for security
- pg from npm to work with postgresDB
- mongoose from npm to work with mongoBD
- nodemailer from npm to send mails to users
- express-rate-limit from npm for requests limit
- multer from npm to upload images
- sharp from npm to resize images

**devDependencies**

- "@types/bcrypt" from npm to use typescript
- "@types/express" from npm to use typescript
- "@types/helmet" from npm to use typescript
- "@types/jasmine" from npm to use typescript
- "@types/jsonwebtoken" from npm to use typescript
- "@types/morgan" from npm to use typescript
- "@types/node" from npm to use typescript
- "@types/pg" from npm to use typescript
- "@types/request" from npm to use typescript
- "@types/supertest" from npm to use typescript
- "@typescript-eslint/eslint-plugin" from npm to use typescript
- "@typescript-eslint/parser" from npm to use typescript
- "eslint" from npm to write prettier code
- "eslint-config-prettier" from npm to write prettier code
- "eslint-plugin-prettier" from npm to write prettier code
- "jasmine" from npm to test code
- "jasmine-spec-reporter" from npm to test code
- "jasmine-ts" from npm to test code
- "nodemon" from npm to Update the server after any change
- "prettier" from npm to write prettier code
- "request" from npm to test code,
- "supertest" from npm to test code
- "ts-node" from npm to use typescript
- "typescript" from npm to use typescript

## .env required variables

PORT=5000
NODE_ENV=[dev]or[test]
PGHOST=localhost
PGDATABASE=store_dev
PGDATABASE_TEST=store_test
PGPORT=5432
PGUSER=your-postgres-user
PGPASSWORD=your-postgres-password
BCRYPT_PASSWORD=your-bcrypt-password
BCRYPT_ROUNDS=your-bcrypt-secure
TOKEN_SECRET=your-secret-token
MONGO_DB_NAME=your-mongo-connection-link
PER_PAGE=number-of-rows-you-will-got-in-results
ACTIVE_MONGO=[true][false] if-you-want-to-use-mongodb-as-caching-system-make-this-true
REQUEST_LIMIT=the limit of requests in one minute
TIME_LIMIT=This is a waiting time in munites to make a request after request limit finished
MESSAGE_LIMIT=Write a message to display in case the maximum number of requests is exceeded
ACTIVE_HOME=[true] make this true if you want to active home api
EMAIL_GMAIL=write your gmail account
PASSWORD_GMAIL=write your gmail password

## Steps run app for the first time

1. write "yarn" or in command line to install required packages
2. create database "store_dev" in postgre db
3. create another database "store_test" in postgre db to test code
4. create .env file and put required variables in .env file
5. "yarn migrate" use this command to migrate tables
6. "yarn start" this command will run the app
7. "yarn test" this command will test the app **notice** to run test change [NODE_ENV]to[test] from [.env]
8. server is running on port 5000 || http://localhost:5000/
9. database is running on port 5432
