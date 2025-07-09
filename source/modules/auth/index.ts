import type { FastifyTypedInstance } from '@/types'
import { AuthModel } from './model'
import { AuthService } from './service'
import { ServiceError } from '@/utils/error'

export const AuthController = async(app: FastifyTypedInstance) => {
  app.route({
    method: 'POST',
    url: '/sign-in',
    schema: {
      tags: ['auth'],
      body: AuthModel.signInBody
    },
    handler: async (request, reply) => {
      try {
        const token = await AuthService.signIn(request.body, app)
        return reply.send({ token })
      } catch(error) {
        if (error instanceof ServiceError) {
          return reply.status(error.code).send({ message: error.message })
        }
        return reply.status(500).send({ message: 'Internal server error.' })
      }
    }
  })
}
