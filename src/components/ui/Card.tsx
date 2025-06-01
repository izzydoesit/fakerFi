import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps): JSX.Element {
  return (
    <motion.div
      className={`rounded-lg border bg-white shadow p-4 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children }: { children: ReactNode }): JSX.Element {
  return <div className="mb-2 font-bold text-lg">{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }): JSX.Element {
  return <h3 className="text-xl font-semibold">{children}</h3>;
}

export function CardContent({ children }: { children: ReactNode }): JSX.Element {
  return <div className="text-sm text-gray-700 space-y-2">{children}</div>;
}
