"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { generateTrades, Trade } from "@/lib/data";

export default function TradeSummary(): JSX.Element {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [totalVolume, setTotalVolume] = useState<number>(0);

  useEffect(() => {
    const data = generateTrades(12);
    const volume = data.reduce((sum, trade) => sum + trade.amount, 0);
    setTotalVolume(volume);
  }, []);

  return (
    <Card className="col-span-1 p-4">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-600">Trade Activity</CardTitle>
        <Activity className="w-5 h-5 text-indigo-500" />
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="text-2xl font-semibold text-gray-800">${totalVolume.toFixed(2)}</div>
        <div className="text-xs text-gray-500">12 trades recorded</div>
      </CardContent>
    </Card>
  );
}
