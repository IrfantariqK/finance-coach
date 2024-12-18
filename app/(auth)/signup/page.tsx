import * as React from "react";
import { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your information to get started
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
} 