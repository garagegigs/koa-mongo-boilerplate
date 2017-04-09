import test from 'ava'
import supertest from 'supertest'
import app from '../src/app'
import monk, { Monk, Collection } from 'monk'
import config from '../src/config'

const db: Monk = monk(config.database.url)
const Book: Collection = db.get('books')
const request = supertest.agent(app.listen())

let newBook

test.after(async t => {
  Book.remove({})
})

test.serial('Add new book', async t => {
  t.plan(2)

  const res = await request.post('/books')
  .send({ title: 'Test Book Title' })

  newBook = res.body

  t.is(res.status, 200)
  t.is(res.body.title, 'Test Book Title')
})

test.serial('List books', async t => {
  t.plan(2)

  const res = await request.get(`/books`)

  t.is(res.status, 200)
  t.true(res.body.length >= 1)
})

test.serial('Get book', async t => {
  t.plan(2)

  const res = await request.get(`/books/${newBook._id}`)

  t.is(res.status, 200)
  t.is(res.body.title, newBook.title)
})

test.serial('Modify book', async t => {
  t.plan(2)

  const res = await request.put(`/books/${newBook._id}`)
  .send({ title: 'New book title' })

  newBook = res.body

  t.is(res.status, 200)
  t.is(res.body.title, 'New book title')
})

test.serial('Delete book', async t => {
  t.plan(1)

  const res = await request.delete(`/books/${newBook._id}`)

  t.is(res.status, 200)
})


test.serial('Get book', async t => {
  t.plan(1)

  const res = await request.get(`/books/${newBook._id}`)

  t.is(res.status, 404)
})

test.serial('Book already deleted should return an error 405', async t => {
  t.plan(1)

  await Book.remove({})

  const res = await request.delete(`/books/${newBook._id}`)

  t.is(res.status, 405)
})
