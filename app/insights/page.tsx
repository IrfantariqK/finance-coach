import { Suspense } from "react";
import { InsightsDisplay } from "../../components/insights-display";
import { InsightsLoading } from "../../components/insights-loading";

export default function InsightsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Financial Insights</h1>
      <Suspense fallback={<InsightsLoading />}>
        <InsightsDisplay />
      </Suspense>
    </div>
  );
}
