"use client";

import type { JSX } from "react";
import { useEffect, useState } from "react";
import { getKYCInfo } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/utils/helpers";
import { format } from "date-fns";

export default function KYCStatus(): JSX.Element {
  const [status, setStatus] = useState<"Verified" | "Pending" | "Rejected" | null>(null);
  const [createdAt, setCreatedAt] = useState<Date | null>(null);

  const statusIcon = {
    Verified: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    Pending: <Clock className="w-5 h-5 text-yellow-500" />,
    Rejected: <XCircle className="w-5 h-5 text-red-500" />
  };

  const statusColor = {
    Verified: "text-green-500",
    Pending: "text-yellow-500",
    Rejected: "text-red-500"
  };

  useEffect(() => {
    const kyc = getKYCInfo();
    setStatus(kyc.status);
    setCreatedAt(new Date(kyc.createdAt));
  }, []);

  return (
    <Card className="col-span-1 p-4">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-base font-medium text-gray-600">KYC Status</CardTitle>
        {status && statusIcon[status]}
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {status && (
          <div className={cn("text-3xl font-semibold", statusColor[status])}>{status}</div>
        )}
        {createdAt && (
          <div className="text-sm text-gray-500">
            Last updated: {format(createdAt, "MMM dd, yyyy 'at' h:mm a")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
