import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  scrollable?: boolean;
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export interface Trade {
  id: string;
  type: "buy" | "sell";
  asset: string;
  amount: number;
  date: string;
}

export interface Holding {
  month: string;
  value: number;
  date: string; // Optional if using real timestamps
}

export interface KYCInfo {
  name: string;
  email: string;
  status: "Verified" | "Pending" | "Rejected";
  createdAt: string;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DateRangeContextProps {
  fromDate: Date;
  toDate: Date;
  range: DateRange;
  setFromDate: (date: Date) => void;
  setToDate: (date: Date) => void;
}
