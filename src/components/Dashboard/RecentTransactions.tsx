"use client";

import type { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useDateRange } from "@/context/DateRangeContext";
import { generateTrades } from "@/lib/data";
import { Trade } from "@/lib/types";
import { ArrowDownLeft, ArrowUpRight, LayoutGrid, Table } from "lucide-react";
import { useMemo, useState } from "react";
import { formatDate } from "@/utils/format";
import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/utils/helpers";

const iconMap = {
  buy: <ArrowUpRight className="w-4 h-4 text-green-500" />,
  sell: <ArrowDownLeft className="w-4 h-4 text-red-500" />
};

export default function RecentTransactions(): JSX.Element {
  const { range } = useDateRange();
  const allTrades = useMemo(
    () => generateTrades(30, range?.from, range?.to),
    [range?.from, range?.to]
  );

  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  const filteredTrades = useMemo(() => {
    return filter === "all" ? allTrades : allTrades.filter((t) => t.type === filter);
  }, [filter, allTrades]);

  const PAGE_SIZE = 10;
  const {
    currentPageItems: paginatedData,
    currentPage,
    totalPages,
    setPage
  } = usePagination<Trade>(filteredTrades, PAGE_SIZE);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b py-2">
        <CardTitle>Recent Transactions</CardTitle>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "text-sm px-2 py-1 rounded",
              filter === "all" ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter("buy")}
            className={cn(
              "text-sm px-2 py-1 rounded",
              filter === "buy" ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Buy
          </button>
          <button
            onClick={() => setFilter("sell")}
            className={cn(
              "text-sm px-2 py-1 rounded",
              filter === "sell" ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Sell
          </button>

          <button
            className={cn("p-1 rounded hover:bg-gray-100", view === "grid" && "bg-gray-100")}
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            className={cn("p-1 rounded hover:bg-gray-100", view === "table" && "bg-gray-100")}
            onClick={() => setView("table")}
          >
            <Table className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>

      {/* Scrollable List */}
      <CardContent className="overflow-y-auto flex-1 px-4 max-h-[18rem]">
        {paginatedData.map((trade) => (
          <div
            key={trade.id}
            className={cn(
              "border-b py-2 text-sm",
              view === "grid"
                ? "grid grid-cols-5 gap-4 items-center"
                : "grid grid-cols-3 gap-8 items-center"
            )}
          >
            <div className="flex items-center gap-2">
              {iconMap[trade.type]} {trade.asset}
            </div>
            <div className="text-gray-600">${trade.amount.toFixed(2)}</div>
            <div className={cn("text-gray-500", view === "table" && "ml-9")}>
              {formatDate(trade.date)}
            </div>
            {view === "grid" && (
              <div className="text-gray-400 font-medium">{trade.id.slice(0, 8)}</div>
            )}
            {view === "grid" && <div className="text-green-600 font-medium">Completed</div>}
          </div>
        ))}
      </CardContent>

      {/* Pagination */}
      <div className="border-t px-4 py-2 flex justify-between items-center text-sm">
        <span className="text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="text-gray-700 px-2 py-1 border rounded hover:bg-gray-100"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="text-gray-700 px-2 py-1 border rounded hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}
