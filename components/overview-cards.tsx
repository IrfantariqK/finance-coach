"use client";

import { motion } from "framer-motion";
import { ArrowDownIcon, ArrowUpIcon, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewCardsProps {
  income: number;
  expenses: number;
}

export function OverviewCards({ income, expenses }: OverviewCardsProps) {
  const balance = income - expenses;
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="transition-shadow bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpIcon className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Monthly earnings
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="transition-shadow bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownIcon className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Monthly spending
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={2}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Available funds
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="transition-shadow bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {savingsRate.toFixed(1)}%
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Of total income
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
