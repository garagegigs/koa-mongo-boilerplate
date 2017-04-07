import Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = 'koa2'
})

router.get('/foo', async (ctx, next) => {
  ctx.body = 'Foo bar'
})

export default router
