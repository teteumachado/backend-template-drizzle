import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { users, accounts, providersEnum, rolesEnum } from '@/database/schema'
import { createSelectSchema } from 'drizzle-zod'

// Types for selecting data
export type User = InferSelectModel<typeof users>
export const RolesEnum = createSelectSchema(rolesEnum)
export type Account = InferSelectModel<typeof accounts>

// Types for inserting data
export type NewUser = InferInsertModel<typeof users>
export type NewAccount = InferInsertModel<typeof accounts>

// Provider enum type
export type Providers = typeof providersEnum.enumValues[number]
