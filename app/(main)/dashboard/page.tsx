import { Suspense } from "react";
 import { getUserAccounts } from "@/actions/dashboard";
// import { getDashboardData } from "@/actions/dashboard";
// import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
// import { CreateAccountDrawer } from ".@/components/create-account-drawer";
// import { BudgetProgress } from "@/components/ui/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
// import { DashboardOverview } from "./_components/transaction-overview";
import { CreateAccountDrawer } from "@/components/ui/create-account-drawer";
export default async function DashboardPage() {
 const accounts:any=getUserAccounts();
 const resolvedAccounts = await accounts;
   const defaultAccount = resolvedAccounts?.find((account: any) => account.isDefault);

  // Get budget for default account
  // let budgetData = null;
  // if (defaultAccount) {
  //   budgetData = await getCurrentBudget(defaultAccount.id);
  // }

  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      {/* <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      /> */}

      {/* Dashboard Overview */}
      {/* <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
      /> */}

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {resolvedAccounts && resolvedAccounts.length > 0 &&
          resolvedAccounts?.map((account :any) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
}