import test from 'ava'
import supertest from 'supertest'
// import { fakeMongoStart, fakeMongoStop } from 'test/support/common'
import app from '../src/app'

const request = supertest.agent(app.listen())

// test.before(async t => {
//   await fakeMongoStart()
// })

// test.before(async t => {
//   await fakeMongoStop()
// })

test('Home / url', async t => {
  t.plan(2)

  const res = await request.get('/')

  t.is(res.status, 200)
  t.is(res.text, 'koa2')
})

test('Home /foo url', async t => {
  t.plan(2)

  const res = await request.get('/foo')

  t.is(res.status, 200)
  t.is(res.text, 'Foo bar')
})

test('Test 405 Method Not Allowed', async t => {
  t.plan(1)

  const res = await request.post('/')

  t.is(res.status, 405)
})

test('Test 501 Method Not Implemented', async t => {
  t.plan(1)

  const res = await request.search('/foo')

  t.is(res.status, 501)
})
