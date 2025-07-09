import { Database } from '@/database'
import { VerifyHash } from '@/utils/password'
import z from 'zod/v4'
import { accounts, users } from '@/database/schema'
import { and, eq } from 'drizzle-orm'
import { AuthModel } from './model'
import { FastifyTypedInstance } from '@/types'
import { ServiceError } from '@/utils/error'

export abstract class AuthService {
  static async signIn({ email, password }: z.infer<typeof AuthModel.signInBody>, app: FastifyTypedInstance) {
    const findUser = await Database.select().from(users).where(eq(users.email, email))
    if (!findUser || !findUser[0]) throw new ServiceError({ code: 401, message: 'Email or password incorrect.' })

    const emailAccount = await Database.select().from(accounts).where(and(eq(accounts.userId, findUser[0].id), eq(accounts.provider, 'EMAIL')))
    if (!emailAccount || !emailAccount[0].password) throw new ServiceError({ code: 401, message: 'Email or password incorrect.' })

    const verifyPassword = VerifyHash(password, emailAccount[0].password)
    if (!verifyPassword) throw new ServiceError({ code: 401, message: 'Email or password incorrect.' })

    const token = app.jwt.sign({ scope: 'user', user: findUser[0] })
    return token
  }
}
