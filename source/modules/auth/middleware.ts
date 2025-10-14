import type { FastifyTypedInstance } from '@/types'
import { Jwt } from '@/types/jwt'
import { Habilitie, hasHabilitie, Role } from '@/utils/habilities'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UsersService } from '../users/service'

export const AuthMiddleware = (app: FastifyTypedInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return reply.status(401).send({ error: 'Authorization header missing' })
    }

    const [scheme, token] = authHeader.split(' ')

    if (scheme !== 'Bearer' || !token) {
      return reply.status(401).send({ error: 'Invalid authorization format' })
    }

    try {
      const decoded = app.jwt.verify(token) as Jwt

      request.auth = decoded
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }
  }
}

export const HasHabilitieMiddleware = (app: FastifyTypedInstance, habilities: Habilitie[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return reply.status(401).send({ error: 'Authorization header missing' })
    }

    const [scheme, token] = authHeader.split(' ')
    if (scheme !== 'Bearer' || !token) {
      return reply.status(401).send({ error: 'Invalid authorization format' })
    }

    try {
      const decoded = app.jwt.verify(token) as Jwt
      request.auth = decoded

      const userRole = await UsersService.getUserRole(decoded.user.id) as Role
      if (!hasHabilitie(userRole, habilities)) return reply.status(403).send({ error: 'Forbidden' })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }
  }
}
