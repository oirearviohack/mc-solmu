# App

## Installation

Node.js is needed to run the front-end build. You can download it [from here](https://nodejs.org/en/). The LTS version is recommended.

All project dependencies are listed in package.json. To install them you need either [Yarn](https://yarnpkg.com/en/docs/install) or NPM (comes with Node.js).

**Yarn is preferred**. While you can use npm to run package.json scripts, **do not use it to install new dependencies**.

Once you have installed Node.js and Yarn, run this command in the root folder (the one that contains file package.json) of the project to install project's dependencies:

```
yarn
```

## Webpack development server

To start the webpack development server run

```
yarn run start
```

This will start the server in [http://localhost:8080/](http://localhost:8080/)

## HTTP-server

To start HTTP-server, that serves dist/-folder, run

```
yarn run start:server
```

This will start the server in [http://0.0.0.0:8080/](http://0.0.0.0:8080/)


## Building the project

To build the project run 

```
yarn run build
```

This will create a production-optimized bundle of the application to dist/.

## Other scripts

All of these scripts can be run with "yarn run [script name]"

| Script | Description |
| --- | --- |
| lint | Runs eslint linter (see .eslinrc.json for linting settings) |
| clean  | Removes dist/-folder |
| clean:report | Removes report/-folder |
| test | Runs jest (see package.json for jest-configuration) |
| test:watch | Runs jest in watch-mode |
| test:ci | Runs jest and prints out a coverage report |