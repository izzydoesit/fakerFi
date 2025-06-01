"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { generateHoldings, Holding } from "@/lib/data";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/UI/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type ChartMode = "bar" | "line";

export default function HoldingsChart(): JSX.Element {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [mode, setMode] = useState<ChartMode>("bar");

  useEffect(() => {
    setHoldings(generateHoldings());
  }, []);

  const data = {
    labels: holdings.map((h) => h.month),
    datasets: [
      {
        label: "Portfolio Value ($)",
        data: holdings.map((h) => h.value),
        backgroundColor: "rgba(59, 130, 246, 0.5)", // Tailwind blue-500
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index" as const, intersect: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <Card className="col-span-1 xl:col-span-1 row-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Holdings Over Time</CardTitle>
        <button
          onClick={() => setMode((m) => (m === "bar" ? "line" : "bar"))}
          className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Toggle to {mode === "bar" ? "Line" : "Bar"}
        </button>
      </CardHeader>
      <CardContent className="h-[300px]">
        {mode === "bar" ? (
          <Bar data={data} options={options} />
        ) : (
          <Line data={data} options={options} />
        )}
      </CardContent>
    </Card>
  );
}
