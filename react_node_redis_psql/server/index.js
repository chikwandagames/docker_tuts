const keys = require('./keys')

// Express App Setup
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Cross Origin Resource Sharing
// This will allow for requests from one domain i.e. where "react app" is running
// to a different domain or port i.e. the domain where "node api" is hosted on
app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

// Prostgres client setup
const { Pool } = require('pg')
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
})

pgClient.on('error', () => console.log('Lost PG connection!'))

// create default table
pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch((err) => console.log(err))

// Redis client setup
const redis = require('redis')
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  // If connection lost, try reconnect once every second
  retry_strategy: () => 1000,
})

const redisPublisher = redisClient.duplicate()

// Express route handlers
app.get('/', (req, res) => {
  res.send('Hi')
})

// For querying pd database, and retrieve all the different values that have ever
// been submitted to postgres
app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values')
  res.send(values.rows)
})

app.get('/values/current', async (req, res) => {
  // Get all info from coresponding hash, "values" in this case
  redisClient.hgetall('values', (err, values) => {
    res.send(values)
  })
})


// For receiving new values from the react app
app.post('/values', async (req, res) => {
  const index = req.body.index

  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high')
  }

  // Put value into redis, key == index, 
  // "Nothing yet!" is a placeholder
  redisClient.hset('values', index, 'Nothing yet!')
  redisPublisher.publish('insert', index)
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

  res.send({ woking: true })
})

app.listen(5000, err => {
  console.log('Server listening on port 5000')
})
