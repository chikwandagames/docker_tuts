const express = require('express')

const redis = require('redis')
const process = require('process')


const app = express()
// Setup a connection the redis server
const client = redis.createClient({
  // Connect to the service created in docker-compose file called "redis-server"
  host: 'my-redis-server',
  // Default redis port
  port: 6379
})
// Set visits to 0, on start
client.set('visits', 0)

app.get('/', (req, res) => {
  // Exit the program, exit status code 0, means it was deliberate
  // exit status code other than 0, means something went wrong
  process.exit(0)
  // To keep track of number of visits to the site
  client.get('visits', (err, visits)=> {
    res.send(`Number of visits: ${visits}`)
    // update the number of times the page has been visited
    client.set('visits', parseInt(visits) + 1)
  })
})

app.listen(8080, () => {
  console.log('Listening on port: 8080')
})