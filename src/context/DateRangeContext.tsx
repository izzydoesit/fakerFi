"use client";

import type { JSX } from "react";
import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { DateRange, DateRangeContextProps } from "@/lib/types";

const DateRangeContext = createContext<DateRangeContextProps | undefined>(undefined);

export function DateRangeProvider({ children }: { children: ReactNode }): JSX.Element {
  const [fromDate, setFromDate] = useState<Date>(new Date("2025-01-01"));
  const [toDate, setToDate] = useState<Date>(new Date("2025-03-30"));

  const range = useMemo<DateRange>(() => ({ from: fromDate, to: toDate }), [fromDate, toDate]);

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
