module.exports = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.REDIS_PORT,
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  // Database name, inside postgres that we want to connect to
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT,

}