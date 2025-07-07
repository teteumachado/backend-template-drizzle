import { FastifyTypedInstance } from '@/types'
import { Database } from '@/utils/database'
import { AuthMiddleware } from '../auth/middleware'

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
      const users = await Database.user.findMany()
      return reply.send(users)
    }
  })
}
