// @flow
import Router from 'koa-router'
import monk from 'monk'
import Boom from 'boom'
import config from '../config'

const db = monk(config.database.url)
const User = db.get('users')
const router = new Router()

router.prefix('/users')

router.get('/', async (ctx, next) => {
  const users = await User.find({})

  ctx.body = users
})

router.post('/', async (ctx) => {
  const input = ctx.request.body

  const inserted = await User.insert(input)

  if (inserted === null || (inserted.value === null && inserted.ok === 1)) {
    throw new Boom.methodNotAllowed('Unable to create user') // eslint-disable-line new-cap
  }

  ctx.body = input
})

router.get('/:id', async (ctx) => {
  const user = await User.findOne({ _id: ctx.params.id })

  if (user === null) {
    throw new Boom.notFound('User doesn\'t exist') // eslint-disable-line new-cap
  }

  ctx.body = user
})

router.put('/:id', async (ctx) => {
  const input = ctx.request.body

  const user = await User.findOneAndUpdate({ _id: ctx.params.id }, { $set: input })

  ctx.body = user
})

router.del('/:id', async (ctx) => {
  const removed = await User.findOneAndDelete({ '_id': ctx.params.id })

  if (removed === null || (removed.value === null && removed.ok === 1)) {
    throw new Boom.methodNotAllowed('Unable to delete user') // eslint-disable-line new-cap
  }

  ctx.body = removed
})

export default router
