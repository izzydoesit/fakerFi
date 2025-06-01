"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useDateRange } from "@/context/DateRangeContext";
import { generateTrades } from "@/lib/data";
import { Trade } from "@/lib/types";
import { Activity } from "lucide-react";
import { useMemo } from "react";

export default function TradeSummary(): JSX.Element {
  const { fromDate, toDate } = useDateRange();

  const trades: Trade[] = useMemo(() => {
    return generateTrades(50).filter((trade) => {
      const date = new Date(trade.date);
      return date >= fromDate && date <= toDate;
    });
  }, [fromDate, toDate]);

  const totalAmount = trades.reduce((acc, t) => acc + t.amount, 0);
  const change = "+15.6% from last quarter"; // Placeholder

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-600">Trade Summary</CardTitle>
        <Activity className="w-5 h-5 text-indigo-500" />
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold text-gray-800">${totalAmount.toFixed(2)}</p>
        <p className="text-sm text-gray-500">{change}</p>
      </CardContent>
    </Card>
  );
}
