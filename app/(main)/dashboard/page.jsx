import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
export default async function DashboardPage() {
    var _a;
    const [accounts, transactions] = await Promise.all([
        getUserAccounts(),
        getDashboardData(),
    ]);
    const defaultAccount = accounts === null || accounts === void 0 ? void 0 : accounts.find((account) => account.isDefault);
    // Get budget for default account
    let budgetData = null;
    if (defaultAccount) {
        budgetData = await getCurrentBudget(defaultAccount.id);
    }
    return (<div className="space-y-8">
        {/* Budget Progress */}
      <BudgetProgress initialBudget={(_a = budgetData === null || budgetData === void 0 ? void 0 : budgetData.budget) !== null && _a !== void 0 ? _a : undefined} currentExpenses={(budgetData === null || budgetData === void 0 ? void 0 : budgetData.currentExpenses) || 0}/>
        {/* Dashboard Overview */}
      
  <DashboardOverview accounts={accounts || []} transactions={transactions || []}/>

        {/* Accounts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                <Plus className="h-10 w-10 mb-2"/>
                <p className="text-sm font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>
   {accounts && accounts.length > 0 && accounts.map((account) => (<AccountCard key={account.id} account={account}/>))}


        </div>
      </div>);
}
