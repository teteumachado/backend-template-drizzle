import { z } from 'zod/v4'
import { UsersModel } from './model'
import { Database } from '@/database'
import { accounts, users } from '@/database/schema'
import { CreateHash } from '@/utils/password'
import { eq } from 'drizzle-orm'
import { ServiceError } from '@/utils/error'
import { redis } from '@/database/redis'
import { decrypt, encrypt } from '@/utils/encrypt'


export abstract class UsersService {
  static async register({ name, email, password }: z.infer<typeof UsersModel.createUserBody>) {
    const findUser = await Database.select().from(users).where(eq(users.email, email))
    if (findUser[0]) throw new ServiceError({ code: 400, message: 'User already exists.' })

    const createdUser = await Database.insert(users).values({ name, email }).returning()
    if (!createdUser) throw new ServiceError({ code: 500, message: 'Failed to create user.' })

    const hashedPassword = await CreateHash(password)
    const createdAccount = await Database.insert(accounts).values({ userId: createdUser[0].id, provider: 'EMAIL', password: hashedPassword })

    if (!createdAccount) {
      await Database.delete(users).where(eq(users.id, createdUser[0].id))
      throw new ServiceError({ code: 500, message: 'Failed to create account.' })
    }

    return createdUser[0]
  }

  static async list() {
    const usersList = await Database.select().from(users)
    return usersList
  }

  static async getUserRole(userId: string) {
    const findEncryptedRole = await redis.get(`role_${userId}`)
    if (findEncryptedRole) {
      const userRole = decrypt(findEncryptedRole)
      return userRole
    }
    const findUserRole = await Database.select({ role: users.role }).from(users).where(eq(users.id, userId))
    if (!findUserRole[0]) throw new ServiceError({ code: 404, message: 'User not found.' })
    const userRole = findUserRole[0].role
    await redis.set(`role_${userId}`, encrypt(userRole))
    return userRole
  }
}
