import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";
import { TransactionFormValues } from "@/app/lib/schema";

export default async function AddTransactionPage({ searchParams }: { searchParams?: Promise<{ edit?: string }> }) {
 const resolvedSearchParams = searchParams? await searchParams :undefined;
  const editId = resolvedSearchParams?.edit;
const accounts = await getUserAccounts() || [];
  let initialData: (TransactionFormValues & { amount: string; date: Date }) | null = null;

if (editId) {
  const transaction = await getTransaction(editId) as any; // temporarily cast to any

  initialData = {
    ...transaction,
    amount: transaction.amount.toString(), // convert number amount to string
    recurringInterval: transaction.recurringInterval || undefined, // ensure not null
    date: new Date(transaction.date), // convert date string to Date object if needed
  };
}


  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}