import type { FastifyTypedInstance } from '@/types'
import { UsersRoutes } from './users'
import { AuthRoutes } from './auth'

export const routes = async(app: FastifyTypedInstance) => {
  app.register(UsersRoutes, { prefix: '/users' })
  app.register(AuthRoutes, { prefix: '/auth' })
}
