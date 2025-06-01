import { faker } from "@faker-js/faker";

export interface Trade {
	id: string;
	type: "buy" | "sell";
	asset: string;
	amount: number;
	date: string;
}

export interface Holding {
	month: string;
	value: number;
}

export interface KYCInfo {
	name: string;
	email: string;
	status: "Verified" | "Pending" | "Rejected";
	createdAt: string;
}

export const getBalance = (): number =>
	parseFloat(faker.finance.amount(10000, 50000));

export const generateTrades = (count = 10): Trade[] =>
	Array.from(
		{ length: count },
		(): Trade => ({
			id: faker.string.uuid(),
			type: faker.helpers.arrayElement(["buy", "sell"]),
			asset: faker.finance.currencyCode(),
			amount: parseFloat(faker.finance.amount(10, 1000)),
			date: faker.date.recent().toISOString(),
		})
	);

export const generateHoldings = (): Holding[] =>
	Array.from(
		{ length: 6 },
		(): Holding => ({
			month: faker.date.month({ context: "standalone" }),
			value: faker.number.int({ min: 5000, max: 15000 }),
		})
	);

export const getKYCInfo = (): KYCInfo => ({
	name: faker.person.fullName(),
	email: faker.internet.email(),
	status: faker.helpers.arrayElement(["Verified", "Pending", "Rejected"]),
	createdAt: faker.date.past().toISOString(),
});
