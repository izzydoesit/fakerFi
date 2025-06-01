"use client";

import { useEffect, useState } from "react";
import { getKYCInfo } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export default function KYCStatus(): JSX.Element {
  const [status, setStatus] = useState<"Verified" | "Pending" | "Rejected">("Pending");
  const [color, setColor] = useState("text-yellow-500");

  useEffect(() => {
    const kyc = getKYCInfo();
    setStatus(kyc.status);

    const colorMap = {
      Verified: "text-green-500",
      Pending: "text-yellow-500",
      Rejected: "text-red-500"
    };
    setColor(colorMap[kyc.status]);
  }, []);

  const statusIcon = {
    Verified: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    Pending: <Clock className="w-5 h-5 text-yellow-500" />,
    Rejected: <XCircle className="w-5 h-5 text-red-500" />
  }[status];

  return (
    <Card className="col-span-1 p-4">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-base font-medium text-gray-600">KYC Status</CardTitle>
        {statusIcon}
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className={`text-2xl font-semibold ${color}`}>{status}</div>
        <div className="text-xs text-gray-500">Last updated: May 30, 2025 at 11:18 AM</div>
      </CardContent>
    </Card>
  );
}
