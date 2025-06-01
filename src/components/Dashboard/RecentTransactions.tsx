"use client";

import { useEffect, useMemo, useState } from "react";
import { generateTrades, Trade } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Table, LayoutGrid } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

export default function RecentTransactions(): JSX.Element {
  const [view, setView] = useState<"table" | "card">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const pageSize = 10;
  const trades: Trade[] = useMemo(() => generateTrades(40), []);
  const totalPages = Math.ceil(trades.length / pageSize);
  const paginatedTrades = trades.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setLastUpdated(new Date());
  }, [currentPage, view]);

  const renderTrade = (trade: Trade) => {
    const Icon = trade.type === "buy" ? ArrowUp : ArrowDown;
    const color = trade.type === "buy" ? "text-green-500" : "text-red-500";

    return (
      <motion.div
        key={trade.id}
        className="flex items-center justify-between border-b pb-2 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-sm font-medium">{trade.asset}</span>
        </div>
        <div className="text-sm text-gray-600">${trade.amount.toFixed(2)}</div>
      </motion.div>
    );
  };

  return (
    <Card className="p-4 h-[500px] flex flex-col justify-between">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-base font-medium text-gray-600">Recent Transactions</CardTitle>
        <div className="flex gap-2">
          <button
            onClick={() => setView("card")}
            className={`text-xs px-2 py-1 border rounded ${view === "card" ? "bg-gray-200" : "text-gray-500"}`}
          >
            <LayoutGrid className="w-4 h-4 inline-block mr-1" />
            Card
          </button>
          <button
            onClick={() => setView("table")}
            className={`text-xs px-2 py-1 border rounded ${view === "table" ? "bg-gray-200" : "text-gray-500"}`}
          >
            <Table className="w-4 h-4 inline-block mr-1" />
            Table
          </button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto pr-1 max-h-[380px]">
        {view === "card" ? (
          <div>{paginatedTrades.map(renderTrade)}</div>
        ) : (
          <table className="w-full text-sm text-left border-t">
            <thead>
              <tr>
                <th className="py-1 text-gray-500">Asset</th>
                <th className="py-1 text-gray-500">Type</th>
                <th className="py-1 text-gray-500">Amount</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrades.map((trade) => (
                <tr key={trade.id} className="border-t">
                  <td className="py-1">{trade.asset}</td>
                  <td className="py-1 capitalize">{trade.type}</td>
                  <td className="py-1">${trade.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>

      <div className="text-xs text-gray-400 mt-2">
        Last updated: {formatDistanceToNowStrict(lastUpdated)} ago
      </div>

      <div className="mt-2 flex justify-between items-center pt-2 border-t pt-3">
        <button
          className="text-xs text-blue-500 disabled:text-gray-300"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xs text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="text-xs text-blue-500 disabled:text-gray-300"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </Card>
  );
}
