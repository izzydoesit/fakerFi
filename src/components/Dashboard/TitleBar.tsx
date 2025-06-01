"use client";

import type { JSX } from "react";
import { CalendarDays, Download } from "lucide-react";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useDateRange } from "@/context/DateRangeContext";
import { generateTrades } from "@/lib/data";
import type { DateRange } from "@/lib/types";
import { motion } from "framer-motion";

export default function TitleBar(): JSX.Element {
  const { fromDate, toDate, setFromDate, setToDate } = useDateRange();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const formattedRange =
    fromDate && toDate
      ? `${format(fromDate, "MMM dd, yyyy")} - ${format(toDate, "MMM dd, yyyy")}`
      : "Select range";

  const handleRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setFromDate(range.from);
      setToDate(range.to);
      setOpen(false);
    }
  };

  return (
    <div className="flex justify-between items-center py-4">
      <motion.h1
        className="text-2xl font-bold tracking-tight text-gray-900"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 12
        }}
      >
        FakerFi Crypto Dashboard
      </motion.h1>

      <div className="flex gap-3 items-center">
        {/* DATE RANGE PICKER */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm text-gray-700 border rounded px-3 py-1.5 hover:bg-gray-100"
          >
            <CalendarDays className="w-4 h-4" />
            {formattedRange}
          </button>

          {open && (
            <div className="absolute right-0 z-50 mt-2 bg-white border rounded shadow-lg p-4">
              <DayPicker
                mode="range"
                selected={{ from: fromDate, to: toDate }}
                onSelect={handleRangeChange}
                numberOfMonths={2}
              />
            </div>
          )}
        </div>

        {/* DOWNLOAD CSV BUTTON */}
        <button
          className="flex items-center gap-2 text-sm bg-black text-white px-4 py-1.5 rounded hover:bg-gray-900"
          onClick={() => {
            const trades = generateTrades(30).filter((t) => {
              const date = new Date(t.date);
              return fromDate && toDate && date >= fromDate && date <= toDate;
            });

            const header = "Asset,Type,Amount,Date";
            const rows = trades.map((t) => [t.asset, t.type, t.amount, t.date].join(","));
            const csv = [header, ...rows].join("\n");

            const blob = new Blob([csv], { type: "text/csv" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "filtered_trades.csv";
            link.click();
          }}
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}
