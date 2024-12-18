import { redirect } from "next/navigation";
import { DashboardContent } from "./dashboard-content";
import { prisma } from "../lib/prisma";
import { getCurrentUser } from "../lib/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: "desc",
    },
    take: 5,
  });

  const totalIncome = await prisma.transaction.aggregate({
    where: {
      userId: user.id,
      type: "income",
    },
    _sum: {
      amount: true,
    },
  });

  const totalExpenses = await prisma.transaction.aggregate({
    where: {
      userId: user.id,
      type: "expense",
    },
    _sum: {
      amount: true,
    },
  });

  return (
    <DashboardContent 
      user={user}
      transactions={transactions}
      totalIncome={totalIncome._sum.amount || 0}
      totalExpenses={totalExpenses._sum.amount || 0}
    />
  );
}
