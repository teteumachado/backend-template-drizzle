import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { users, accounts, providersEnum } from '@/database/schema'

// Types for selecting data
export type User = InferSelectModel<typeof users>
export type Account = InferSelectModel<typeof accounts>

// Types for inserting data
export type NewUser = InferInsertModel<typeof users>
export type NewAccount = InferInsertModel<typeof accounts>

// Provider enum type
export type Providers = typeof providersEnum.enumValues[number]
