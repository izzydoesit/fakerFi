"use client";

import { CalendarDays, Download } from "lucide-react";

export default function TitleBar(): JSX.Element {
  return (
    <div className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-bold text-gray-800">FakerFi Crypto Dashboard</h1>
      <div className="flex gap-3 items-center">
        <button className="flex items-center gap-2 text-sm text-gray-700 border rounded px-3 py-1.5 hover:bg-gray-100">
          <CalendarDays className="w-4 h-4" />
          Jan 01, 2025 - Mar 30, 2025
        </button>
        <button
          className="flex items-center gap-2 text-sm bg-black text-white px-4 py-1.5 rounded hover:bg-gray-900"
          onClick={() => {
            const csv = "Asset,Type,Amount\nBTC,Buy,1200\nETH,Sell,900";
            const blob = new Blob([csv], { type: "text/csv" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "trades.csv";
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
