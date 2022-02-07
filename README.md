<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" height="160" alt="Nest.js Logo" /></a>
  <a href="https://nextjs.com" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" height="160" alt="Next.js logo">
</p>

  <p align="center">Nest.js & Next.js Start Pack</p>

## Description

[Nest](https://github.com/nestjs/nest) TypeScript Nest.js repository.

[Next.js](https://github.com/vercel/next.js/) Next.js starter repository.

## Installation

```bash
$ yarn
```

## Setup

Modify `docker-compose.yml` to create containers for local development.

Create `.env` variable in the root directory with proper environment settings

Available variables:

```
BASIC_AUTH_LOGIN
BASIC_AUTH_PASSWORD
BASIC_AUTH_MESSAGE
```

## Dependencies

You need to use `yarn add` with parameter `-W` to add dependency.

```bash
$ yarn add some-library -W

$ yarn add some-dev-library -D -W
```

You need to use `yarn remove` with parameter `-W` to remove dependency.

```bash
$ yarn remove some-library -W
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Cypress test

```bash
# open cypress to work on tests
$ yarn cy:open

# run cypress tests in command line
$ yarn cy:run

# create a report in cypress/reports
$ yarn report
```

## Running the storybook

```bash
# development
yarn storybook

# production
yarn build-storybook
node ./scripts/copy-storybook-to-dist.js

# will run in nest as statically served
```