// @flow
import Router from 'koa-router'
import monk from 'monk'
import config from '../config'

// const debug = require('debug')('srv.gigs.users:users')

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

  if (!inserted) {
    ctx.throw(405, 'Unable to add new user.')
  }

  ctx.body = input
})

router.get('/:id', async (ctx) => {
  const user = await User.findOne({ _id: ctx.params.id })

  if (user === null) {
    ctx.throw(404, 'User doesn\'t exist')
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

  if (!removed) {
    ctx.throw(405, 'Unable to delete user')
  }

  ctx.body = removed
})

export default router
