import 'dotenv/config'
import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastifyJwt from '@fastify/jwt'
import { routes } from '@/routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })
app.register(fastifyJwt, {
  secret: process.env.AUTH_SECRET!
})

app.register(fastifySwagger, {
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'Core Funnel API',
      description: 'API for the Core Funnel project',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.after(() => {
  app.register(routes)
})

app.listen({ port: 3333 }).then(() => console.log('HTTP server running!')).catch((err) => {
  console.error('Erro ao iniciar o servidor:', err)
  process.exit(1)
})
