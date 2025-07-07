import type { FastifyTypedInstance } from '@/types'
import { Database } from '@/utils/database'
import { VerifyHash } from '@/utils/password'
import { Providers } from '@prisma/client'
import z from 'zod/v4'

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

      const findUser = await Database.user.findUnique({
        where: {
          email
        },
        include: {
          accounts: true
        }
      })
      if (!findUser) return reply.status(401).send({ error: 'Email or password incorrect' })

      const emailAccount = findUser.accounts.find((a) => a.provider === Providers.EMAIL)
      if (!emailAccount || !emailAccount.password) return reply.status(401).send({ error: 'Email or password incorrect' })

      const verifyPassword = VerifyHash(password, emailAccount.password)
      if (!verifyPassword) return reply.status(401).send({ error: 'Email or password incorrect' })

      const token = app.jwt.sign({ scope: 'user', user: findUser })
      return reply.send({ token })
    }
  })
}
