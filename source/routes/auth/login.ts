import type { FastifyTypedInstance } from '@/types'
import { Database } from '@/database'
import { VerifyHash } from '@/utils/password'
import z from 'zod/v4'
import { accounts, users } from '@/database/schema'
import { and, eq } from 'drizzle-orm'

export const UserLogin = async(app: FastifyTypedInstance) => {
  app.route({
    method: 'POST',
    url: '/login',
    schema: {
      tags: ['auth'],
      body: z.object({
        email: z.string().email(),
        password: z.string()
      })
    },
    handler: async (request, reply) => {
      const { email, password } = request.body

      const findUser = await Database.select().from(users).where(eq(users.email, email))
      if (!findUser || !findUser[0]) return reply.status(401).send({ error: 'Email or password incorrect' })

      const emailAccount = await Database.select().from(accounts).where(and(eq(accounts.userId, findUser[0].id), eq(accounts.provider, 'EMAIL')))
      if (!emailAccount || !emailAccount[0].password) return reply.status(401).send({ error: 'Email or password incorrect' })

      const verifyPassword = VerifyHash(password, emailAccount[0].password)
      if (!verifyPassword) return reply.status(401).send({ error: 'Email or password incorrect' })

      const token = app.jwt.sign({ scope: 'user', user: findUser[0] })
      return reply.send({ token })
    }
  })
}
