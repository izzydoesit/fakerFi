"use client";

import type { DateRangeContextProps } from "@/lib/types";
import { createContext, ReactNode, useContext, useState, useMemo } from "react";

const DateRangeContext = createContext<DateRangeContextProps | undefined>(undefined);

export function DateRangeProvider({ children }: { children: ReactNode }): JSX.Element {
  const [fromDate, setFromDate] = useState<Date>(new Date("2025-01-01"));
  const [toDate, setToDate] = useState<Date>(new Date("2025-03-30"));
  const range = useMemo(() => ({ from: fromDate, to: toDate }), [fromDate, toDate]);

  return (
    <DateRangeContext.Provider value={{ fromDate, toDate, setFromDate, setToDate, range }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange(): DateRangeContextProps {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
}
