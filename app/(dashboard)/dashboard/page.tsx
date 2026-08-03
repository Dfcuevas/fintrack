import DashboardHeader from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/Button";
import StatsGrid from "@/components/ui/StatsGrid";

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader
        title="Dashboard Overview"
        action={
          <Button href="/transactions/new-transaction" size="xs">
            + Add Transaction
          </Button>
        }
      />
      <main className="p-6 space-y-6 bg-softBlue">
        <StatsGrid />
      </main>
    </div>
  );
}
