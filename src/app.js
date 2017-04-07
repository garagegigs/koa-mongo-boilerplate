import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-pino-logger'
import Boom from 'boom'

import errorHandler from 'middlewares/errorHandler'
import index from 'routes/index'
import users from 'routes/users'
import books from 'routes/books'

import config from './config'

const app: Koa = new Koa()
const router: Router = new Router()

// app.silent = true // disable console.errors
app.use(errorHandler)
app.use(logger({
  name: config.app.id,
  level: config.logger.level,
  enabled: config.logger.enabled
}))
app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(), // eslint-disable-line new-cap
  methodNotAllowed: () => new Boom.methodNotAllowed() // eslint-disable-line new-cap
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(books.routes(), books.allowedMethods())
app.use(users.routes(), users.allowedMethods())

export default app
