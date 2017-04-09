// @flow
import test from 'ava'
import supertest from 'supertest'
import app from '../src/app'
import monk, { Monk, Collection } from 'monk'
import config from '../src/config'

const db: Monk = monk(config.database.url)
const User: Collection = db.get('users')
const request = supertest.agent(app.listen())

let newUser

test.after(async t => {
  User.remove({})
})

test.serial('Add new user', async t => {
  t.plan(2)

  const res = await request.post('/users')
  .send({ name: 'John Doe' })

  newUser = res.body

  t.is(res.status, 200)
  t.is(res.body.name, 'John Doe')
})

test.serial('List users', async t => {
  t.plan(2)

  const res = await request.get(`/users`)

  t.is(res.status, 200)
  t.true(res.body.length >= 1)
})

test.serial('Get user', async t => {
  t.plan(2)

  const res = await request.get(`/users/${newUser._id}`)

  t.is(res.status, 200)
  t.is(res.body.name, newUser.name)
})

test.serial('Modify user', async t => {
  t.plan(2)

  const res = await request.put(`/users/${newUser._id}`)
  .send({ name: 'Jane Doe' })

  newUser = res.body

  t.is(res.status, 200)
  t.is(res.body.name, 'Jane Doe')
})

test.serial('Delete user', async t => {
  t.plan(1)

  const res = await request.delete(`/users/${newUser._id}`)

  t.is(res.status, 200)
})


test.serial('Get user', async t => {
  t.plan(1)

  const res = await request.get(`/users/${newUser._id}`)

  t.is(res.status, 404)
})

test.serial('User already deleted should return an error 405', async t => {
  t.plan(1)

  const res = await request.delete('/users/aaaaaaaaaaaaaaaaaaaaaaaa')

  t.is(res.status, 405)
})
