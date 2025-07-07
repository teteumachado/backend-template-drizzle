import type { FastifyTypedInstance } from '@/types'
import { UserLogin } from './login'

export const AuthRoutes = async(app: FastifyTypedInstance) => {
  app.register(UserLogin)
}
