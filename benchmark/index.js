var Benchmark = require('benchmark')
var suite = new Benchmark.Suite()

// add tests
suite.add('RegExp#test', function () {
  return /o/.test('Hello World!')
})
.add('String#indexOf', function () {
  return String('Hello World!').indexOf('o') > -1
})
// add listeners
.on('cycle', function (event) {
  console.log(String(event.target))
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
// run async
.run({ 'async': true })
