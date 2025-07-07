import { User } from '@prisma/client'

export type Jwt = {
  scope: 'user',
  user: User
}
