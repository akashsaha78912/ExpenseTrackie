var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";
export default async function AccountPage({ params }) {
    const resolveParams = await params;
    const id = Array.isArray(resolveParams.id) ? resolveParams.id[0] : resolveParams.id;
    const accountData = await getAccountWithTransactions(id);
    if (!accountData) {
        notFound();
    }
    const { transactions } = accountData, account = __rest(accountData, ["transactions"]);
    return (<div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(parseFloat(account.balance))}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea"/>}>
        <AccountChart transactions={transactions}/>
      </Suspense>

      {/* Transactions Table */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea"/>}>
        <TransactionTable transactions={transactions}/>
      </Suspense>
    </div>);
}
