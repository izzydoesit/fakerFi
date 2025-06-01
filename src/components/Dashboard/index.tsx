"use client";

import { useEffect, useState } from "react";
import AccountSummary from "./AccountSummary";
import { motion } from "framer-motion";

export default function Dashboard(): JSX.Element {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, 5000); // Refresh data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={refreshKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <AccountSummary />
    </motion.div>
  );
}
