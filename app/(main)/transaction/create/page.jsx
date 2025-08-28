import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";
export default async function AddTransactionPage({ searchParams }) {
    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const editId = resolvedSearchParams === null || resolvedSearchParams === void 0 ? void 0 : resolvedSearchParams.edit;
    const accounts = await getUserAccounts() || [];
    let initialData = null;
    if (editId) {
        const transaction = await getTransaction(editId); // temporarily cast to any
        initialData = Object.assign(Object.assign({}, transaction), { amount: transaction.amount.toString(), recurringInterval: transaction.recurringInterval || undefined, date: new Date(transaction.date) });
    }
    return (<div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">Add Transaction</h1>
      </div>
      <AddTransactionForm accounts={accounts} categories={defaultCategories} editMode={!!editId} initialData={initialData}/>
    </div>);
}
