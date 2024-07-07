import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { db } from "../db";
import { expenses, expenses as expenseTable } from "../db/schema/expenses";
import { eq } from "drizzle-orm";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(50),
  amount: z.string(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostScehma = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: " 100" },
  { id: 2, title: "Transportation", amount: "50" },
  { id: 3, title: "Entertainment", amount: "200" },
  { id: 4, title: "Utilities", amount: "75" },
  { id: 5, title: "Rent", amount: "1500" },
];

export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id));

    return c.json({ expenses: expenses });
  })
  .post("/", getUser, zValidator("json", createPostScehma), async (c) => {
    const expense = await c.req.valid("json");
    const user = c.var.user;
    const result = await db
      .insert(expenseTable)
      .values({
        ...expense,
        userId: user.id,
      })
      .returning();

    c.status(201);
    return c.json(result);
  })
  .get("/total-spent", getUser, async (c) => {
    const totalSpent = fakeExpenses.reduce(
      (sum, expense) => sum + +expense.amount,
      0
    );
    return c.json({ totalSpent });
  })
  .get("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deleteExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deleteExpense });
  });
