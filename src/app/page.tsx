import Dashboard from "@/components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FakerFi Dashboard",
  description: "Mock crypto dashboard built with Next.js, Tailwind, and Faker.js.",
  openGraph: {
    title: "FakerFi Dashboard",
    description: "Explore your mock crypto portfolio in a sleek React dashboard.",
    url: "https://faker-fi.vercel.app",
    siteName: "FakerFi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FakerFi Dashboard Preview"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FakerFi Dashboard",
    description: "Mock crypto portfolio interface with real-time UI and charts.",
    images: ["/og-image.png"]
  }
};

export default function HomePage(): JSX.Element {
  return (
    <main className="p-6 min-h-screen bg-gray-50 dark:bg-black">
      <Dashboard />
    </main>
  );
}
