import Dashboard from "@/components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FakerFi Dashboard",
  description: "Mock crypto dashboard built with Next.js, Tailwind, and Faker.js."
};

export default function HomePage(): JSX.Element {
  return (
    <main className="p-6 min-h-screen bg-gray-50 dark:bg-black">
      <Dashboard />
    </main>
  );
}
