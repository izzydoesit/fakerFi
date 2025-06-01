import { faker } from "@faker-js/faker";
import { DateRange } from "react-day-picker";
import { Holding, KYCInfo, Trade } from "./types";

export const getBalance = (): number => parseFloat(faker.finance.amount(10000, 50000));

export const generateTrades = (count = 10): Trade[] =>
  Array.from(
    { length: count },
    (): Trade => ({
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(["buy", "sell"]),
      asset: faker.finance.currencyCode(),
      amount: parseFloat(faker.finance.amount(10, 1000)),
      date: faker.date.recent().toISOString()
    })
  );

export const generateHoldings = (range: DateRange): Holding[] => {
  const data: Holding[] = [];

  let current = new Date(range.from);
  while (current <= range.to) {
    data.push({
      month: current.toLocaleString("default", { month: "short" }),
      value: faker.number.int({ min: 5000, max: 15000 }),
      date: new Date(current)
    });
    current.setMonth(current.getMonth() + 1);
  }

  return data;
};

export const getKYCInfo = (): KYCInfo => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  status: faker.helpers.arrayElement(["Verified", "Pending", "Rejected"]),
  createdAt: faker.date.past().toISOString()
});
