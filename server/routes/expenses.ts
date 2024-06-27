import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(50),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostScehma = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 100 },
  { id: 2, title: "Transportation", amount: 50 },
  { id: 3, title: "Entertainment", amount: 200 },
  { id: 4, title: "Utilities", amount: 75 },
  { id: 5, title: "Rent", amount: 1500 },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostScehma), async (c) => {
    const data = await c.req.valid("json");
    const expense = createPostScehma.parse(data);
    fakeExpenses.push({ id: fakeExpenses.length + 1, ...expense });
    c.status(201);
    return c.json(expense);
  })
  .get("/total-spent", (c) => {
    const totalSpent = fakeExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    return c.json({ totalSpent });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deleteExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deleteExpense });
  });
