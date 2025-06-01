"use client";

import {
  CreditCard,
  DollarSign,
  IndianRupee,
  LayoutGrid,
  Table,
} from "lucide-react";
import { useMemo, useState } from "react";
import { generateTrades } from "@/lib/data";
import { Trade } from "@/lib/types";
import { formatDate } from "@/utils/format";
import { Card, CardContent, CardHeader } from "../ui/Card";
import PaginationControls from "../ui/PaginationControls";
import { useDateRange } from "@/context/DateRangeContext";
import { motion } from "framer-motion";

const iconMap: Record<Trade["type"], JSX.Element> = {
  buy: <DollarSign className="w-4 h-4 text-green-500" />,
  sell: <IndianRupee className="w-4 h-4 text-red-500" />,
};

export default function RecentTransactions(): JSX.Element {
  const { range } = useDateRange();
  const [layout, setLayout] = useState<"grid" | "table">("grid");
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const allTrades = useMemo(
    () => generateTrades(20, range.from, range.to),
    [range.from, range.to]
  );

  const filteredTrades = allTrades.filter(
    (t) => filter === "all" || t.type === filter
  );

  const paginatedTrades = filteredTrades.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <Card className="max-h-[500px] overflow-auto relative">
      <CardHeader>
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
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex justify-end gap-2 mb-2">
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
                  <div className="text-xs text-gray-500">
                    {formatDate(trade.date)}
                  </div>
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

        {filteredTrades.length > pageSize && (
          <PaginationControls
            currentPage={page}
            totalPages={Math.ceil(filteredTrades.length / pageSize)}
            onPageChange={setPage}
          />
        )}

        <div className="text-xs text-gray-400 text-right mt-2">
          Last updated: just now
        </div>
      </CardContent>
    </Card>
  );
}
