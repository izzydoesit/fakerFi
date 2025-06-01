"use client";

import { useState } from "react";
import { generateHoldings, Holding } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { BarChart as BarIcon, LineChart as LineIcon } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function HoldingsChart(): JSX.Element {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  const holdings: Holding[] = generateHoldings();

  const categories = holdings.map((h) => h.month);
  const values = holdings.map((h) => h.value);

  const chartOptions = {
    chart: {
      id: "holdings-chart",
      toolbar: { show: false },
      animations: {
        easing: "easeinout",
        speed: 400
      }
    },
    xaxis: {
      categories,
      labels: { style: { colors: "#888" } }
    },
    yaxis: {
      labels: { style: { colors: "#888" } }
    },
    stroke: {
      curve: "smooth"
    },
    colors: ["#4f46e5"]
  };

  const series = [
    {
      name: "Holdings",
      data: values
    }
  ];

  const toggleChartType = (): void => {
    setChartType((prev) => (prev === "bar" ? "line" : "bar"));
  };

  return (
    <Card className="p-4 h-[500px]">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-base font-medium text-gray-600">Holdings Over Time</CardTitle>
        <button
          onClick={toggleChartType}
          className="text-xs px-2 py-1 border rounded text-gray-500 hover:bg-gray-100 flex items-center gap-1"
        >
          {chartType === "bar" ? <LineIcon className="w-4 h-4" /> : <BarIcon className="w-4 h-4" />}
          Toggle to {chartType === "bar" ? "Line" : "Bar"}
        </button>
      </CardHeader>
      <CardContent className="px-1">
        <Chart options={chartOptions as any} series={series} type={chartType} height={400} />
      </CardContent>
    </Card>
  );
}
