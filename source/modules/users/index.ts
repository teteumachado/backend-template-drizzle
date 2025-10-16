import { FastifyTypedInstance } from '@/types'
import { HasHabilitieMiddleware } from '@/modules/auth/middleware'
import { UsersService } from './service'
import { UsersModel } from './model'
import { ServiceError } from '@/utils/error'

export const UsersController = async (app: FastifyTypedInstance) => {
  app.route({
    method: 'GET',
    url: '/',
    preHandler: [HasHabilitieMiddleware(app, ['manage:leads', 'view:leads'])],
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
    method: 'GET',
    url: '/:userId',
    preHandler: [HasHabilitieMiddleware(app, ['manage:leads', 'view:leads'])],
    schema: {
      tags: ['users'],
      description: 'Get a user by ID.',
      params: UsersModel.findUserParams
    },
    handler: async (request, reply) => {
      const { userId } = request.params
      const user = await UsersService.findUser(userId)
      return reply.send(user)
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

  app.route({
    method: 'POST',
    url: '/update/role/:userId',
    preHandler: [HasHabilitieMiddleware(app, ['manage:roles'])],
    schema: {
      tags: ['users'],
      description: 'Create a new user without provider.',
      body: UsersModel.updateRoleBody,
      params: UsersModel.updateRoleParams
    },
    handler: async (request, reply) => {
      try {
        const updatedUser = await UsersService.updateUserRole(request.params.userId, request.body.role)
        return reply.send({
          message: 'User role updated successfully.',
          user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
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
