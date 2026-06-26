import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const advertisementsTable = pgTable("advertisements", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Advertisement = typeof advertisementsTable.$inferSelect;
export type NewAdvertisement = typeof advertisementsTable.$inferInsert;
