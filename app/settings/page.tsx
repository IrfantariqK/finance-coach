import { Suspense } from "react";
import { SettingsForm } from "../../components/settings-form";
import { PlaidLink } from "../../components/plaid-link";
import { getCurrentUser } from "../lib/session";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid gap-6">
        <div className="space-y-6">
          <div className="text-xl font-semibold">Profile Settings</div>
          <Suspense fallback={<div>Loading...</div>}>
            <SettingsForm user={user} />
          </Suspense>
        </div>

        <div className="space-y-6">
          <div className="text-xl font-semibold">Bank Connections</div>
          <Suspense fallback={<div>Loading...</div>}>
            <PlaidLink />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
