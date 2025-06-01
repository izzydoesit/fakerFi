"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getBalance, getKYCInfo } from "@/lib/data";
import { useEffect, useState } from "react";

export default function AccountSummary() {
	const [balance, setBalance] = useState(0);
	const [kyc, setKyc] = useState({
		name: "",
		email: "",
		status: "",
		createdAt: "",
	});

	useEffect(() => {
		setBalance(getBalance());
		setKyc(getKYCInfo());
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Account Summary</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 text-sm">
				<div>
					<strong>Balance:</strong>{" "}
					<span className="text-green-600 font-semibold">
						${balance.toLocaleString()}
					</span>
				</div>
				<div>
					<strong>Name:</strong> {kyc.name}
				</div>
				<div>
					<strong>Email:</strong> {kyc.email}
				</div>
				<div>
					<strong>KYC Status:</strong>{" "}
					<span
						className={
							kyc.status === "Verified"
								? "text-green-500"
								: kyc.status === "Pending"
								? "text-yellow-500"
								: "text-red-500"
						}
					>
						{kyc.status}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
