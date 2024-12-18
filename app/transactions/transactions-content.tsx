"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../components/ui/select";
import { Transaction } from "@prisma/client";
import { Search, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface TransactionsContentProps {
  transactions: Transaction[];
}

export function TransactionsContent({ transactions }: TransactionsContentProps) {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "income" && transaction.type === "income") ||
      (filter === "expense" && transaction.type === "expense");
    return matchesSearch && matchesFilter;
  });

  const total = filteredTransactions.reduce(
    (acc, transaction) =>
      transaction.type === "income"
        ? acc + transaction.amount
        : acc - transaction.amount,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-8 mx-auto space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Transactions
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track your income and expenses
          </p>
        </div>
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardContent className="py-4">
            <p className="text-sm font-medium">Net Balance</p>
            <p className={`text-2xl font-bold ${total >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8 w-full md:w-[250px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expenses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 transition-colors rounded-lg bg-accent/50 hover:bg-accent"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === "income" 
                      ? "bg-green-100 dark:bg-green-900/30" 
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}>
                    {transaction.type === "income" ? (
                      <ArrowUpCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowDownCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === "income" 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.category || "Uncategorized"}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {filteredTransactions.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                No transactions found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 