import { drizzle } from 'drizzle-orm/node-postgres'
export const Database = drizzle(`postgresql://${process.env.POSTGRES_USER!}:${process.env.POSTGRES_PASSWORD!}@${process.env.POSTGRES_HOST!}:${process.env.POSTGRES_PORT!}/${process.env.POSTGRES_DATABASE!}?schema=public`)
