import z from 'zod/v4'
import { RolesEnum } from '@/types/database'

export namespace UsersModel {
  // Request body
  export const createUserBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
  })

  // Request params
  export const updateRoleParams = z.object({
    userId: z.string().uuid()
  })
  export const updateRoleBody = z.object({
    role: RolesEnum
  })
}
