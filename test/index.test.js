import test from 'ava'

test('my passing test', t => {
  t.pass()
})

const promise = Promise.reject(new TypeError('🦄'))

test('rejects', async t => {
  const error = await t.throws(promise)
  t.is(error.message, '🦄')
})
