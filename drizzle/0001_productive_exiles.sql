CREATE TYPE "public"."roles" AS ENUM('USER', 'ADMIN', 'SUPER_ADMIN');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "roles" DEFAULT 'USER' NOT NULL;