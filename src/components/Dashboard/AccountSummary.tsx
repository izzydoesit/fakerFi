"use client";

import type { JSX } from "react";
import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getBalance } from "@/lib/data";

export default function AccountSummary(): JSX.Element {
  const [balance, setBalance] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  useEffect(() => {
    setBalance(getBalance());

    const delta = parseFloat((Math.random() * 40 - 20).toFixed(1)); // simulate -20% to +20%
    setPercentChange(delta);
  }, []);

  return (
    <Card className="col-span-1 p-4">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-600">Account Balance</CardTitle>
        <DollarSign className="w-5 h-5 text-green-500 shrink-0" />
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="text-3xl font-semibold text-gray-800">${balance.toLocaleString()}</div>
        <div className="text-sm text-gray-500">
          {percentChange >= 0 ? "+" : ""}
          {percentChange}% from last month
        </div>
      </CardContent>
    </Card>
  );
}
