import { createClient } from 'redis'

export const redis = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD
})

const connectRedis = async () => {
  await redis.connect()
  console.log('Redis: Connection successfully')
}

redis.on('error', (error) => {
  console.error(`Redis: Connection error, ${error}`)
})
connectRedis().catch(console.error)
