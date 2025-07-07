import { FastifyTypedInstance } from '@/types'
import { AuthMiddleware } from '../auth/middleware'
import { Database } from '@/database'
import { users } from '@/database/schema'

export const ViewUsers = async (app: FastifyTypedInstance) => {
  app.route({
    method: 'GET',
    url: '/',
    preHandler: [AuthMiddleware(app)],
    schema: {
      tags: ['users'],
      description: 'Create a new user without provider.'
    },
    handler: async (request, reply) => {
      const usersList = await Database.select().from(users)
      return reply.send(usersList)
    }
  })
}
