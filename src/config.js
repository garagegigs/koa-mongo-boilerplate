const { version } = require('../package.json')

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true,
    logger: {
      enabled: true,
      level: process.env.LOG_LEVEL || 4
    }
  },
  test: {
    isProduction: true,
    port: 3000,
    logger: {
      enabled: true,
      level: 'silent'
    },
    database: {
      url: 'mongodb://localhost:27017/test'
    },
    redis: {
      port: process.env.REDIS_PORT || '6379',
      host: process.env.REDIS_HOST || 'gigs-boilerplate-redis'
    }
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  environment: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  ssl: require('./ssl'), // eslint-disable-line global-require
  app: {
    name: process.env.APP_NAME || 'Garage Gigs boilerplate',
    id: process.env.APP_ID || 'gigs-boilerplate',
    version
  },
  logger: {
    enabled: true,
    level: process.env.LOG_LEVEL || 'trace' // 'fatal', 'error', 'warn', 'info', 'debug', 'trace'; also 'silent'
  },
  database: {
    url: 'mongodb://localhost:27017/boilerplate'
  },
  documentation: {
    enabled: true,
    endpoint: '/docs'
  },
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || 'localhost'
  }
}, environment)
