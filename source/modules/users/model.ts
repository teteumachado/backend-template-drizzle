import z from 'zod/v4'

export namespace UsersModel {
  // Request body
  export const createUserBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
  })
}
