import {
  integer,
  text,
  pgEnum,
  pgTable,
  serial,
  index,
  varchar,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);

export const insertexpenseSchema = createInsertSchema(expenses, {
  title: z.string().min(3, { message: "Title must be atleast 3 Characters" }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Amount must be positive" }),
});
export const selectexpenseSchema = createSelectSchema(expenses);
