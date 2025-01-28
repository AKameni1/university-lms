import {
  integer,
  text,
  pgTable,
  uuid,
  varchar,
  pgEnum,
  date,
  timestamp,
} from 'drizzle-orm/pg-core';

export const STATUS = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED']);
export const ROLE = pgEnum('role', ['USER', 'ADMIN']);
export const BORROW_STATUS = pgEnum('borrow_status', ['BORROWED', 'RETURNED']);

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  universityId: integer('university_id').notNull().unique(),
  password: text('password').notNull(),
  universityCard: text('university_card').notNull(),
  status: STATUS('status').notNull().default('PENDING'),
  role: ROLE('role').notNull().default('USER'),
  lastActivityDate: date('last_activity_date').defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const books = pgTable('books', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  genre: text('genre').notNull(),
  rating: integer('rating').notNull(),
  totalCopies: integer('total_copies').notNull().default(1),
  availableCopies: integer('available_copies').notNull().default(0),
  description: text('description').notNull(),
  coverColor: varchar('cover_color', { length: 7 }).notNull(),
  coverUrl: text('cover_url').notNull(),
  videoUrl: text('video_url').notNull(),
  summary: varchar('summary').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
