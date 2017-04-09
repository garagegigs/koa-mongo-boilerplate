// @flow
import Router from 'koa-router'
import monk, { Monk, Collection } from 'monk'
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

  if (!inserted) {
    ctx.throw(405, 'Unable to add new book.')
  }

  ctx.body = input
})

router.get('/:id', async (ctx: Context) => {
  const book = await Book.findOne({ _id: ctx.params.id })

  if (book === null) {
    ctx.throw(404, 'Book doesn\'t exist')
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

  if (!removed) {
    ctx.throw(405, 'Unable to delete book')
  }

  ctx.body = removed
})

export default router
