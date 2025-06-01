import { motion } from "framer-motion";
import type { JSX } from "react";
import type { CardContentProps, CardHeaderProps, CardProps, CardTitleProps } from "@/lib/types";
import { cn } from "@/utils/helpers";

export function Card({ children, className = "", scrollable = false }: CardProps): JSX.Element {
  const scrollableClasses = scrollable ? "max-h-[400px] overflow-y-auto" : "";
  return (
    <motion.div
      className={cn("rounded-lg border bg-white shadow p-4 relative", scrollableClasses, className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className = "" }: CardHeaderProps): JSX.Element {
  return (
    <div
      className={cn("mb-2 flex flex-row items-center justify-between flex-nowrap gap-2", className)}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }: CardTitleProps): JSX.Element {
  return <h3 className={cn("text-xl, font-semibold", className)}>{children}</h3>;
}

export function CardContent({ children, className = "" }: CardContentProps): JSX.Element {
  return <div className={cn("text-sm text-gray-700 space-y-2", className)}>{children}</div>;
}
