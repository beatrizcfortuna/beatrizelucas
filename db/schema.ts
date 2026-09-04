import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const rsvps = sqliteTable('rsvps', {
  id: text('id').primaryKey(),
  names: text('names').notNull(),
  phone: text('phone'),
  attendance: integer('attendance', { mode: 'boolean' }).notNull(),
  message: text('message'),
  createdAt: text('created_at').notNull(),
});

