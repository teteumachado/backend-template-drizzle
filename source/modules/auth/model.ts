import {
  pgTable,
  uuid,
  varchar,
  boolean,
  text,
  timestamp,
  jsonb,
  pgEnum,
  uniqueIndex
} from 'drizzle-orm/pg-core'
import { z } from 'zod/v4'

export namespace AuthModel {
  // Database schema
  export const providersEnum = pgEnum('providers', ['EMAIL'])
  export const rolesEnum = pgEnum('roles', ['USER', 'ADMIN', 'SUPER_ADMIN'])

  export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    emailVerified: boolean('email_verified').notNull().default(false),
    image: text('image'),
    role: rolesEnum('role').notNull().default('USER'),
    createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().$onUpdate(() => new Date())
  },
  (table) => ({
    emailIdx: uniqueIndex('users_email_idx').on(table.email)
  }))

  export const accounts = pgTable('accounts', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    provider: providersEnum('provider').notNull(),
    providerData: jsonb('provider_data'),
    password: text('password'),
    createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().$onUpdate(() => new Date())
  },
  (table) => ({
    userIdIdx: uniqueIndex('accounts_user_id_idx').on(table.userId)
  }))

  // Request body
  export const signInBody = z.object({
    email: z.string().email(),
    password: z.string()
  })
}
