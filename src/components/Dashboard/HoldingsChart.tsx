"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useDateRange } from "@/context/DateRangeContext";
import { generateHoldings } from "@/lib/data";
import { Holding } from "@/lib/types";
import { BarChart, LineChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function HoldingsChart(): JSX.Element {
  const { range } = useDateRange();
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [data, setData] = useState<Holding[]>([]);

  useEffect(() => {
    setData(generateHoldings(range));
  }, [range]);

  const toggleChartType = () => {
    setChartType((prev) => (prev === "bar" ? "line" : "bar"));
  };

  const chartOptions = {
    chart: { type: chartType },
    xaxis: { categories: data.map((d) => d.month) },
    stroke: { curve: "smooth" },
    markers: { size: chartType === "line" ? 5 : 0 }
  };

  const chartSeries = [
    {
      name: "Holdings",
      data: data.map((d) => d.value)
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Holdings Over Time</CardTitle>
          <button onClick={toggleChartType}>
            {chartType === "bar" ? (
              <LineChart className="w-5 h-5 text-blue-500" />
            ) : (
              <BarChart className="w-5 h-5 text-green-600" />
            )}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ApexChart options={chartOptions} series={chartSeries} type={chartType} height={250} />
      </CardContent>
    </Card>
  );
}
