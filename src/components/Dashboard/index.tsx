"use client";

import type { JSX } from "react";
import { motion } from "framer-motion";
import AccountSummary from "./AccountSummary";
import TradeSummary from "./TradeSummary";
import KYCStatus from "./KYCStatus";
import HoldingsChart from "./HoldingsChart";
import RecentTransactions from "./RecentTransactions";
import TitleBar from "./TitleBar";

export default function Dashboard(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <TitleBar />

      {/* Two columns at mobile and higher */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AccountSummary />
        <TradeSummary />
        <KYCStatus />
      </div>

      {/* Two columns at mobile and higher */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HoldingsChart />
        <RecentTransactions />
      </div>
    </motion.div>
  );
}
