// For holding redis connection keys
const keys = require('./keys')
const redis = require('redis')

// 
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  // If connection is lost, try reconnecting once every second
  retry_strategy: () => 1000
})

const sub = redisClient.duplicate()


function fibonacci(index) {
  if (index < 1) return 1
  return fibonacci(index -1) + fibonacci(index -2)
}

// console.log(fibonacci(5))

// Watch redis for new value inserted, then run fibonacci()

sub.on("message", (channel, message) => {
  // Each time we receive a new value in redis, we calculate the fibonacci value
  // insert that value into a hash called "values", 
  // The key == message, value == returned value from fibonacci()
  redisClient.hset('values', message, fibonacci(parseInt(message)))
})

// Subscribe to any insert event, i.e. on new value inserted
sub.subscribe('insert')