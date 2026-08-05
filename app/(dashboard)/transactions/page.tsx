import DashboardHeader from "@/components/layout/DashboardHeader";
import Link from "next/link";

const TransactionsPage = () => {
  return (
    <>
      <DashboardHeader title="Transactions History" />
      <Link href="/transactions/new-transaction">New Transaction</Link>
    </>
  );
};

export default TransactionsPage;
