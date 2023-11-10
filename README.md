# Taskie app - Backend

This repo contains source code for the backend of the Taskie app.

## Install

This project uses `yarn` as a package manager.

To install `yarn`, follow these [instructions](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

After cloning the source code, install dependencies by running:

```bash
yarn install
```

## Development

Create your own `.env` file, copy content from `.example.env` and replace `username` and `password` with MongoDB username and password, which are stored on Render.

To start server, run:

```bash
yarn start
```

The backend will be up and running at localhost:4000.

## Continuous Delivery

The backend is deployed on Render.

Every commit or merge to the `main` branch will trigger Render to re-deploy the backend.
