"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface DateRange {
  from: Date;
  to: Date;
}

const defaultRange: DateRange = {
  from: new Date(2025, 0, 1),
  to: new Date(2025, 2, 30)
};

const DateRangeContext = createContext<{
  range: DateRange;
  setRange: (range: DateRange) => void;
}>({
  range: defaultRange,
  setRange: () => {}
});

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange>(defaultRange);
  return (
    <DateRangeContext.Provider value={{ range, setRange }}>{children}</DateRangeContext.Provider>
  );
}

export const useDateRange = () => useContext(DateRangeContext);
