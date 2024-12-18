"use client";

import { useState, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
export function PlaidLink() {
  const [token, setToken] = useState<string | null>(null);
  const { toast } = useToast();

  const onSuccess = useCallback(
    async (public_token: string) => {
      try {
        const response = await fetch("/api/plaid/link", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_token }),
        });

        if (!response.ok) throw new Error("Failed to link bank account");

        toast({
          title: "Success",
          description: "Bank account linked successfully!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to link bank account. Please try again.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  const handleClick = async () => {
    if (token) {
      open();
      return;
    }

    try {
      const response = await fetch("/api/plaid/link", {
        method: "POST",
      });
      const data = await response.json();
      setToken(data.link_token);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize bank connection. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleClick} disabled={!ready}>
      Connect Bank Account
    </Button>
  );
}
