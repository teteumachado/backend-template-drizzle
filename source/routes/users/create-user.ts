import { Database } from '@/database'
import { accounts, users } from '@/database/schema'
import { FastifyTypedInstance } from '@/types'

import { CreateHash } from '@/utils/password'
import { eq } from 'drizzle-orm'
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

      const findUser = await Database.select().from(users).where(eq(users.email, email))
      if (findUser[0]) return reply.status(400).send({ error: 'User already exists' })

      const createdUser = await Database.insert(users).values({ name, email }).returning()
      if (!createdUser) return reply.status(500).send({ error: 'Failed to create user' })

      const hashedPassword = await CreateHash(password)
      const createdAccount = await Database.insert(accounts).values({ userId: createdUser[0].id, provider: 'EMAIL', password: hashedPassword })

      if (!createdAccount) {
        await Database.delete(users).where(eq(users.id, createdUser[0].id))
        return reply.status(500).send({ error: 'Failed to create account' })
      }

      return reply.status(201).send({
        message: 'User created successfully',
        user: {
          id: createdUser[0].id,
          name: createdUser[0].name,
          email: createdUser[0].email
        }
      })
    }
  })
}
