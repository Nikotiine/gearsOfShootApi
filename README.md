# Gears Of Shoot Api
## Description

Api for Gears of shoot APP

## Installation

```bash
$ npm install
```
### Create .env
```bash
$ touch .env
```
```
PORT_DEV=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=nikamres
ACCESS_TOKEN_SECRET_KEY=create a key
MAIL_HOST=your mail host
MAIL_USER=your mail user
MAIL_PASSWORD=your mail password
MAIL_CONTACT=your mail
MAIL_PORT=587
WEBSITE_URL=localhost front end
```
### Intit database
```bash
$ docker compose up -d
```
```bash
$ npm run db:create
```
```bash
$ npm run seed:run
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```
### Create migration
```bash
$ npm run migration:generate
$ npm run mi:gen
```
### Run migration
```bash
$ npm run migration:run
$ npm run mi:run
```
### Drop database
```bash
$ npm run db:drop
```
## Test
### Tester c'est douter
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Nikotiine

## License

Nest is [MIT licensed](LICENSE).

