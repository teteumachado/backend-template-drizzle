import type { FastifyTypedInstance } from '@/types'
import { z } from 'zod/v4'

export const routes = async(app: FastifyTypedInstance) => {
  app.route({
    method: 'POST',
    url: '/users',
    schema: {
      tags: ['users'],
      description: 'Create a new user',
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
      }),
      response: {
        201: z.null().describe('User created successfully')
      }
    },
    handler: async (request, reply) => {
      return reply.status(201).send()
    }
  })
}
