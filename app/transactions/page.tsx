import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/session";
import { prisma } from "../lib/prisma";
import { TransactionsContent } from "./transactions-content";

export default async function TransactionsPage() {
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
  });

  return <TransactionsContent transactions={transactions} />;
}
