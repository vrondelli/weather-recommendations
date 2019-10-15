## Description

An API that gives Recommendations based on city weather

## Endpoint

| Method | Endpoint               | Usage                       | Returns  | Query Params |
| ------ | ---------------------- | --------------------------- | -------- | ------------ |
| GET    | /recommendations/music | get playlist recommendation | playlist | cityName     |

## Installation

```bash
$ npm install
```

## Running the app

To run the app you need to create a .env file in root directory with the following variables:

```
OPEN_WEATHER_BASE_URL=
OPEN_WEATHER_API_KEY=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```
