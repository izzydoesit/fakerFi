"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { getKYCInfo } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/UI/Card";

export default function KYCStatus(): JSX.Element {
  const [status, setStatus] = useState<"Verified" | "Pending" | "Rejected">("Pending");

  useEffect(() => {
    setStatus(getKYCInfo().status);
  }, []);

  const statusIcon = {
    Verified: <CheckCircle2 className="text-green-500 w-5 h-5" />,
    Pending: <Clock className="text-yellow-500 w-5 h-5" />,
    Rejected: <XCircle className="text-red-500 w-5 h-5" />
  }[status];

  return (
    <Card className="col-span-1 p-4">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-600">KYC Status</CardTitle>
        {statusIcon}
      </CardHeader>
      <CardContent className="text-sm text-gray-800">
        <span>{status}</span>
      </CardContent>
    </Card>
  );
}
