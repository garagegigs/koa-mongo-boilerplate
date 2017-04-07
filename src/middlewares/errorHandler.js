import config from '../config'

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    const status = e.output ? e.output.statusCode : ctx.status

    let resError = {
      code: status || 500,
      message: e.message,
      errors: e.errors
    }

    if (e instanceof Error && config.environment !== 'production') {
      resError = {
        ...resError,
        stack: e.stack
      }
    }

    Object.assign(ctx, { body: resError, status: status || 500 })

    ctx.log.error(e)
  }
}
