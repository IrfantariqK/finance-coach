"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { TransactionsList } from "../../components/transactions-list";
import { OverviewCards } from "../../components/overview-cards";
import { SpendingChart } from "../../components/spending-chart";
import { Transaction, User } from "@prisma/client";

interface DashboardContentProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
}

export function DashboardContent({ 
  user, 
  transactions, 
  totalIncome, 
  totalExpenses 
}: DashboardContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container p-6 mx-auto space-y-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Welcome back, {user.name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Here&apos;s your financial overview
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <OverviewCards
          income={totalIncome}
          expenses={totalExpenses}
        />
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SpendingChart transactions={transactions} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <TransactionsList transactions={transactions} />
        </motion.div>
      </div>
    </motion.div>
  );
} 