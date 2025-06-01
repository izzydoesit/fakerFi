"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart, LineChart } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { useDateRange } from "@/context/DateRangeContext";
import { getHoldingsInRange } from "@/lib/data";
import { formatDate } from "@/utils/format";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function HoldingsChart(): JSX.Element {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const { fromDate, toDate } = useDateRange();

  const hasValidDates =
    fromDate instanceof Date &&
    !isNaN(fromDate.getTime()) &&
    toDate instanceof Date &&
    !isNaN(toDate.getTime());

  const data = useMemo(() => {
    if (!hasValidDates) return [];
    return getHoldingsInRange(fromDate, toDate);
  }, [fromDate, toDate, hasValidDates]);

  const categories = data.map((entry) => entry.month);
  const values = data.map((entry) => entry.value);

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-2">
        <CardTitle>Holdings Over Time</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}
        >
          {chartType === "bar" ? (
            <LineChart className="h-4 w-4 text-muted-foreground" />
          ) : (
            <BarChart className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="w-full overflow-x-auto">
          <ApexChart
            type={chartType}
            height={300}
            options={{
              chart: { toolbar: { show: false }, animations: { easing: "easeInOut", speed: 500 } },
              xaxis: { categories },
              stroke: { curve: "smooth" },
              markers: { size: chartType === "line" ? 4 : 0 }
            }}
            series={[{ name: "Holdings", data: values }]}
          />
        </div>
        <p className="text-muted-foreground text-sm mt-4">
          {hasValidDates
            ? `Showing data from ${formatDate(fromDate)} to ${formatDate(toDate)}`
            : "No data available for the selected range."}
        </p>
      </CardContent>
    </Card>
  );
}
