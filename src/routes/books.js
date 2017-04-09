// @flow
import Router from 'koa-router'
import monk, { Monk, Collection } from 'monk'
import Boom from 'boom'
import config from '../config'

import type { Context } from 'koa'

const db: Monk = monk(config.database.url)
const Book: Collection = db.get('books')

const router: Router = new Router()

router.prefix('/books')

router.get('/', async (ctx: Context) => {
  const books = await Book.find({})

  ctx.body = books
})

router.post('/', async (ctx: Context) => {
  const input = ctx.request.body

  const inserted = await Book.insert(input)

  if (inserted === null || (inserted.value === null && inserted.ok === 1)) {
    throw new Boom.methodNotAllowed('Unable to create book') // eslint-disable-line new-cap
  }

  ctx.body = input
})

router.get('/:id', async (ctx: Context) => {
  const book = await Book.findOne({ _id: ctx.params.id })

  if (book === null) {
    throw new Boom.notFound('Book doesn\'t exist') // eslint-disable-line new-cap
  }

  ctx.body = book
})

router.put('/:id', async (ctx: Context) => {
  const input = ctx.request.body

  const book = await Book.findOneAndUpdate({ _id: ctx.params.id }, { $set: input })

  ctx.body = book
})

router.del('/:id', async (ctx: Context) => {
  const removed = await Book.findOneAndDelete({ '_id': ctx.params.id })

  if (removed === null || (removed.value === null && removed.ok === 1)) {
    throw new Boom.methodNotAllowed('Unable to delete book') // eslint-disable-line new-cap
  }

  ctx.body = removed
})

export default router
