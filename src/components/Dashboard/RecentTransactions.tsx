"use client";

import { useEffect, useState } from "react";
import { generateTrades, Trade } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/UI/Card";
import { ArrowDownRight, ArrowUpRight, List, Table } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TradeFilter = "all" | "buy" | "sell";
type ViewMode = "card" | "table";

interface TransactionItemProps {
  trade: Trade;
  isCardView: boolean;
}

function TransactionItem({ trade, isCardView }: TransactionItemProps): JSX.Element {
  const isBuy = trade.type === "buy";
  const Icon = isBuy ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className={`${
        isCardView
          ? "flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          : "grid grid-cols-4 gap-4 px-3 py-2 text-sm border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      {isCardView ? (
        <>
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${isBuy ? "text-green-500" : "text-red-500"}`} />
            <div>
              <div className="font-medium flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isBuy ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {trade.type.toUpperCase()}
                </span>
                {trade.asset}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(trade.date).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="text-sm font-semibold">${trade.amount.toFixed(2)}</div>
        </>
      ) : (
        <>
          <div className="font-semibold">{trade.asset}</div>
          <div
            className={`font-medium ${
              isBuy ? "text-green-600" : "text-red-600"
            }`}
          >
            {trade.type.toUpperCase()}
          </div>
          <div className="text-sm">${trade.amount.toFixed(2)}</div>
          <div className="text-xs text-gray-500">{new Date(trade.date).toLocaleString()}</div>
        </>
      )}
    </motion.li>
  );
}

export default function RecentTransactions(): JSX.Element {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<TradeFilter>("all");
  const [view, setView] = useState<ViewMode>("card");

  const PAGE_SIZE = 5;

  useEffect(() => {
    setTrades(generateTrades(20));
  }, []);

  const filteredTrades = trades.filter((trade) =>
    filter === "all" ? true : trade.type === filter
  );

  const totalPages = Math.ceil(filteredTrades.length / PAGE_SIZE);
  const paginated = filteredTrades.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <Card className="col-span-1">
      <CardHeader className="sticky top-0 z-10 bg-white dark:bg-black">
        <div className="flex justify-between items-center">
          <CardTitle>Recent Transactions</CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => setView("card")}
              className={`p-1 rounded ${
                view === "card" ? "bg-blue-100 text-blue-600" : "hover:text-blue-600"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("table")}
              className={`p-1 rounded ${
                view === "table" ? "bg-blue-100 text-blue-600" : "hover:text-blue-600"
              }`}
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          {["all", "buy", "sell"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilter(type as TradeFilter);
                setPage(0);
              }}
              className={`text-xs px-3 py-1 rounded-full border ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-black text-gray-700 dark:text-gray-300"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pb-20">
        <ul className="space-y-1 min-h-[12rem]">
          <AnimatePresence mode="wait" initial={false}>
            {paginated.map((trade) => (
              <TransactionItem key={trade.id} trade={trade} isCardView={view === "card"} />
            ))}
          </AnimatePresence>
        </ul>

        <div className="sticky bottom-0 z-10 bg-white dark:bg-black p-3 border-t">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Previous
          </button>
          <span className="text-xs text-gray-500">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
