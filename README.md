# Koa Mongo Microservice Boilerplate
[![Build Status](https://travis-ci.org/garagegigs/koa-mongo-boilerplate.svg?branch=master)](https://travis-ci.org/garagegigs/koa-mongo-boilerplate)

## Getting Started

- Get the latest version

You can start by cloning the latest version of Koa Mongo Boilerplate on your local machine by running:

```bash
$ git clone -o koa-mongo-boilerplate -b master --single-branch \
      git@github.com:garagegigs/koa-mongo-boilerplate.git MyService
$ cd MyService
```



You need to have an access to MongoBD, you can docker-compose to level up an instance
```bash
$ docker-compose up -d
```

Start development server
```bash
$ npm run dev
```

Start production server
```bash
$ NODE_ENV=production npm start
```

Run test
```bash
$ npm run test
```

Run test coverage
```bash
# get test coverage
$ npm run cover
```

