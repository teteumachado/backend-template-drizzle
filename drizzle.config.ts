import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './source/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://${process.env.POSTGRES_USER!}:${process.env.POSTGRES_PASSWORD!}@${process.env.POSTGRES_HOST!}:${process.env.POSTGRES_PORT!}/${process.env.POSTGRES_DATABASE!}?schema=public`
  }
})
