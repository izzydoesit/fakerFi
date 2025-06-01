"use client";

import { useEffect, useState } from "react";
import { generateTrades, Trade } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/UI/Card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface TransactionItemProps {
  trade: Trade;
}

function TransactionItem({ trade }: TransactionItemProps): JSX.Element {
  const isBuy = trade.type === "buy";
  const Icon = isBuy ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.li
      whileHover={{ scale: 1.015 }}
      className="flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${isBuy ? "text-green-500" : "text-red-500"}`} />
        <div>
          <div className="font-medium">
            {isBuy ? "Buy" : "Sell"} {trade.asset}
          </div>
          <div className="text-xs text-gray-500">{new Date(trade.date).toLocaleString()}</div>
        </div>
      </div>
      <div className="text-sm font-semibold">${trade.amount.toFixed(2)}</div>
    </motion.li>
  );
}

export default function RecentTransactions(): JSX.Element {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    setTrades(generateTrades(8));
  }, []);

  return (
    <Card className="col-span-1 xl:col-span-2 row-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {trades.map((trade) => (
            <TransactionItem key={trade.id} trade={trade} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
