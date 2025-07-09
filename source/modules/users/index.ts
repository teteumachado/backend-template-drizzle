import { FastifyTypedInstance } from '@/types'
import { AuthMiddleware } from '@/modules/auth/middleware'
import { UsersService } from './service'
import { UsersModel } from './model'
import { ServiceError } from '@/utils/error'

export const UsersController = async (app: FastifyTypedInstance) => {
  app.route({
    method: 'GET',
    url: '/',
    preHandler: [AuthMiddleware(app)],
    schema: {
      tags: ['users'],
      description: 'List of users.'
    },
    handler: async (request, reply) => {
      const usersList = await UsersService.list()
      return reply.send(usersList)
    }
  })

  app.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['users'],
      description: 'Create a new user without provider.',
      body: UsersModel.createUserBody
    },
    handler: async (request, reply) => {
      try {
        const createdUser = await UsersService.register(request.body)
        return reply.send({
          message: 'User created successfully.',
          user: {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email
          }
        })
      } catch(error) {
        if (error instanceof ServiceError) {
          return reply.status(error.code).send({ message: error.message })
        }
        return reply.status(500).send({ message: 'Internal server error.' })
      }
    }
  })
}
