import { FastifyTypedInstance } from '@/types'
import { Database } from '@/utils/database'
import { Providers } from '@prisma/client'
import { CreateHash } from '@/utils/password'
import z from 'zod/v4'

export const CreateUser = async (app: FastifyTypedInstance) => {
  app.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['users'],
      description: 'Create a new user without provider.',
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
      })
    },
    handler: async (request, reply) => {
      const { name, email, password } = request.body

      const findUser = await Database.user.findUnique({
        where: {
          email
        }
      })

      if (findUser) return reply.status(400).send({ error: 'User already exists' })

      const createdUser = await Database.user.create({
        data: {
          name,
          email
        }
      })
      if (!createdUser) return reply.status(500).send({ error: 'Failed to create user' })

      const hashedPassword = await CreateHash(password)
      const createdAccount = await Database.account.create({
        data: {
          userId: createdUser.id,
          provider: Providers.EMAIL,
          password: hashedPassword
        }
      })

      if (!createdAccount) {
        await Database.user.delete({
          where: {
            id: createdUser.id
          }
        })
        return reply.status(500).send({ error: 'Failed to create account' })
      }

      return reply.status(201).send({
        message: 'User created successfully',
        user: {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email
        }
      })
    }
  })
}
