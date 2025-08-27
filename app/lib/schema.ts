import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["CURRENT", "SAVINGS"]),
  balance: z.string().min(1, "Initial balance is required"),
  isDefault: z.boolean().default(false),
});




export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: z.string().min(1, "Amount is required"),
  date: z.date(),
  accountId: z.string().min(1, "Account is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().nullable().optional(), // ✅ optional + nullable
  isRecurring: z.boolean().default(false),
  recurringInterval: z
    .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
    .optional(), // ✅ optional
});

// ✅ This type matches zodResolver correctly
export type TransactionFormValues = {
  type: "INCOME" | "EXPENSE";
  amount: string;
  date: Date;
  accountId: string;
  category: string;
  isRecurring: boolean;
  description?: string | null; // optional + nullable
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"; // optional
};
