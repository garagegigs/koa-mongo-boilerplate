#!/usr/bin/env node
if (process.env.NODE_ENV === 'development') {
  (() => {
    if (!require('piping')({ // eslint-disable-line
      hook: true,
      ignore: /(\/\.|~$|\.json$)/i
    })) {
      return // eslint-disable-line no-useless-return
    }
  })()
}

require('../server.babel') // babel registration (runtime transpilation for node)

/**
 * Module dependencies.
 */
const debug = require('debug')('srv.gigs.users:server')
const http = require('http')
const spdy = require('spdy')
const app = require('../src/app')
const config = require('../src/config')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port || '3000')
// app.set('port', port)

/**
 * Create HTTP server.
 */
let server
if (process.env.NODE === 'test') {
  // const server = app.listen(port, () => resolve(server))
  server = http.createServer(app.callback())
} else {
  // const server = spdy.createServer(ssl, app)
  //   .listen(port, () => resolve(server))
  server = spdy.createServer(config.ssl, app.callback())
    // .listen(port, () => server)
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  const port = parseInt(val, 10) // eslint-disable-line no-shadow

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}
