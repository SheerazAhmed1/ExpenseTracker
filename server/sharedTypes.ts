import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string()
    .min(3, { message: "Title must be atleast 3 Characters" })
    .max(50, { message: "Title must be at most 3 Characters" }),
  amount: z.string(),
});

export const createExpenseScehma = expenseSchema.omit({ id: true });
