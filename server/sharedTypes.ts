import { insertexpenseSchema } from "./db/schema/expenses";

export const createExpenseSchema = insertexpenseSchema.omit({
  id: true,
  createdAt: true,
});
