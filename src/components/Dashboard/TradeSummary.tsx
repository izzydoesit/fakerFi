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
    <Card>
      <CardHeader>
        <CardTitle>Trade Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
          <strong>Total Trades:</strong> <span className="font-medium">{trades.length}</span>
        </div>
        <div>
          <strong>Total Volume:</strong>{" "}
          <span className="text-blue-600 font-semibold">${totalVolume.toFixed(2)}</span>
        </div>
        <div>
          <strong>Breakdown:</strong>
          <ul className="list-disc list-inside pl-2 mt-1 space-y-1">
            {trades.slice(0, 5).map((trade) => (
              <li key={trade.id}>
                {trade.type.toUpperCase()} {trade.asset} – ${trade.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
