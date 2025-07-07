import { User } from './database'

export type Jwt = {
  scope: 'user',
  user: User
}
