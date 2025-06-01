"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { generateTrades, Trade } from "@/lib/data";

export default function TradeSummary(): JSX.Element {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [totalVolume, setTotalVolume] = useState<number>(0);

  useEffect(() => {
    const data = generateTrades(12);
    setTrades(data);
    const volume = data.reduce((sum, trade) => sum + trade.amount, 0);
    setTotalVolume(volume);
  }, []);

  return (
    <Card className="col-span-1 p-4">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-600">Trade Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="text-2xl font-semibold text-gray-800">${totalVolume.toFixed(2)}</div>
        <ul className="text-xs text-gray-500 space-y-1">
          {trades.slice(0, 3).map((trade) => (
            <li key={trade.id}>
              {trade.type.toUpperCase()} {trade.asset} – ${trade.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
