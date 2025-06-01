"use client";

import { DollarSign, IndianRupee, LayoutGrid, Table } from "lucide-react";
import { useMemo, useState } from "react";
import { generateTrades } from "@/lib/data";
import { Trade } from "@/lib/types";
import { formatDate } from "@/utils/format";
import { Card, CardContent, CardHeader } from "../ui/Card";
import PaginationControls from "../ui/PaginationControls";
import { useDateRange } from "@/context/DateRangeContext";
import { motion } from "framer-motion";
import { usePagination } from "@/hooks/usePagination";

const PAGE_SIZE = 10;

const iconMap: Record<Trade["type"], JSX.Element> = {
  buy: <DollarSign className="w-4 h-4 text-green-500" />,
  sell: <IndianRupee className="w-4 h-4 text-red-500" />
};

export default function RecentTransactions(): JSX.Element {
  const { fromDate, toDate } = useDateRange();
  const [layout, setLayout] = useState<"grid" | "table">("grid");
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");

  const allTrades = useMemo(() => generateTrades(30, fromDate, toDate), [fromDate, toDate]);

  const filteredTrades = allTrades.filter((t) => filter === "all" || t.type === filter);

  const {
    currentPageItems: paginatedTrades,
    currentPage,
    totalPages,
    setPage
  } = usePagination(filteredTrades, PAGE_SIZE);

  return (
    <Card className="relative h-[500px] flex flex-col">
      {/* Sticky Header */}
      <CardHeader className="sticky top-0 bg-white z-10 border-b">
        <div className="flex justify-between items-center w-full">
          <div className="text-xl font-semibold">Recent Transactions</div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setLayout("grid")}
              className={`text-gray-500 hover:text-black ${
                layout === "grid" ? "font-semibold" : ""
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout("table")}
              className={`text-gray-500 hover:text-black ${
                layout === "table" ? "font-semibold" : ""
              }`}
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end my-2">
          <div className="flex gap-2">
            {["all", "buy", "sell"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f as "all" | "buy" | "sell");
                  setPage(1);
                }}
                className={`text-sm px-3 py-1 rounded border ${
                  filter === f ? "bg-black text-white" : "text-gray-600"
                }`}
              >
                {f[0].toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto space-y-3 px-4 py-2">
        {paginatedTrades.length > 0 ? (
          paginatedTrades.map((trade) => (
            <motion.div
              key={trade.id}
              className="flex justify-between items-center p-2 border rounded"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-3 items-center">
                {iconMap[trade.type]}
                <div>
                  <div className="font-medium">{trade.asset}</div>
                  <div className="text-xs text-gray-500">{formatDate(trade.date)}</div>
                </div>
              </div>
              <div className="font-semibold">
                {trade.type === "buy" ? "+" : "-"}${trade.amount.toFixed(2)}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-500 text-sm text-center">No trades found</div>
        )}
      </div>

      {/* Sticky Footer */}
      <CardContent className="sticky bottom-0 bg-white z-10 border-t mt-auto pt-2">
        {filteredTrades.length > PAGE_SIZE && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <div className="text-xs text-gray-400 text-right mt-2">Last updated: just now</div>
      </CardContent>
    </Card>
  );
}
