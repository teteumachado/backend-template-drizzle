import type { FastifyTypedInstance } from '@/types'
import { CreateUser } from './create-user'
import { ViewUsers } from './view-users'

export const UsersRoutes = async(app: FastifyTypedInstance) => {
  app.register(CreateUser)
  app.register(ViewUsers)
}
