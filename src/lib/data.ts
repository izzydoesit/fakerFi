import { faker } from "@faker-js/faker";
import { addDays, isAfter, isBefore } from "date-fns";
import { Trade, Holding, KYCInfo } from "./types";

export const getBalance = (): number => parseFloat(faker.finance.amount(10000, 50000));

export const generateTrades = (count = 50, from?: Date, to?: Date): Trade[] =>
  Array.from({ length: count }, (): Trade => {
    const date = faker.date.between({
      from: from ?? new Date("2025-01-01"),
      to: to ?? new Date("2025-03-30")
    });
    return {
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(["buy", "sell"]),
      asset: faker.finance.currencyCode(),
      amount: parseFloat(faker.finance.amount(10, 1000)),
      date: date.toISOString()
    };
  });

export const generateHoldings = (): Holding[] => {
  const start = new Date("2025-01-01");
  return Array.from({ length: 12 }, (_, i): Holding => {
    const date = addDays(start, i * 7); // weekly data
    return {
      date: date.toISOString(),
      month: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      }),
      value: faker.number.int({ min: 5000, max: 15000 })
    };
  });
};

export const getHoldingsInRange = (from: Date, to: Date): Holding[] =>
  generateHoldings().filter((holding) => {
    const holdingDate = new Date(holding.date);
    return !isBefore(holdingDate, from) && !isAfter(holdingDate, to);
  });

export const getKYCInfo = (): KYCInfo => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  status: faker.helpers.arrayElement(["Verified", "Pending", "Rejected"]),
  createdAt: faker.date.past().toISOString()
});
