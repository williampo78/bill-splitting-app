import { useState, useEffect } from 'react';
import type { Expense, Transaction, SplitBillsResult } from '@/type/transaction';
import { useBillStore } from '@/stores/bill';
import { TbArrowBigDownLinesFilled } from 'react-icons/tb';

function Transaction() {
	const { bills } = useBillStore();
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [expenses, setExpense] = useState<Expense[]>([]);

	useEffect(() => {
		const _expenses = bills.map((bill) => {
			return {
				title: bill.item,
				contributions: [{ person: bill.paidBy.name, amount: bill.price }],
				customShares: bill.sharedBy.map((share) => {
					return {
						person: share.name,
						share: share.amount,
					};
				}),
			};
		});
		setExpense(_expenses);
		calculateEachCost();
	}, [bills]);

	useEffect(() => {
		splitBills();
	}, [expenses]);

	const calculateEachCost = () => {
		console.log('calculate bill', bills);
		const result: { userId: string; userName: string; cost: number }[] = [];
		bills.forEach((bill) => {
			const currentPerson = result.find((r) => r.userId === bill.paidBy._id);
			if (currentPerson) {
				currentPerson.cost += bill.price;
			} else {
				result.push({ userId: bill.paidBy._id, userName: bill.paidBy.name, cost: bill.price });
			}
		});
		console.log('result', result);
	};

	//計算分帳結果
	const splitBills = (): void => {
		console.log(expenses);

		let totalExpenses: Record<string, number> = {};
		let people = new Set<string>();
		let totalContributions: Record<string, number> = {}; // Track total contributions for each contributor

		// Calculate total contributions and track participants
		for (let expense of expenses) {
			for (let contribution of expense.contributions) {
				let { person, amount } = contribution;
				people.add(person);

				// Track total contributions
				if (!(person in totalContributions)) totalContributions[person] = 0;
				totalContributions[person] += amount;

				if (!(person in totalExpenses)) totalExpenses[person] = 0;
				totalExpenses[person] += amount;
			}
		}

		// Initialize fair shares for all participants
		let fairShares: Record<string, number> = {};
		people.forEach((person) => (fairShares[person] = 0));

		// Distribute shares based on customShares
		for (let expense of expenses) {
			if (expense.customShares) {
				for (let { person, share } of expense.customShares) {
					people.add(person); // Ensure all participants are tracked
					if (!(person in fairShares)) fairShares[person] = 0;
					fairShares[person] += share;
				}
			}
		}

		// Calculate each person's balance
		let balances: Record<string, number> = {};
		people.forEach((person) => {
			balances[person] = (totalExpenses[person] || 0) - (fairShares[person] || 0);
		});

		// Settle debts
		let _transactions = [];
		while (true) {
			let payers = Object.keys(balances).filter((person) => balances[person] < -0.01);
			let receivers = Object.keys(balances).filter((person) => balances[person] > 0.01);
			if (payers.length === 0 || receivers.length === 0) break;

			let payer = payers.reduce((a, b) => (balances[a] < balances[b] ? a : b));
			let receiver = receivers.reduce((a, b) => (balances[a] > balances[b] ? a : b));
			let amount = Math.min(-balances[payer], balances[receiver]);

			balances[payer] += amount;
			balances[receiver] -= amount;

			_transactions.push({
				payer,
				receiver,
				amount: amount.toFixed(2),
			});
			setTransactions(_transactions);
		}
	};

	return (
		<ul className="flex flex-col gap-3">
			{transactions.map((transaction, index) => (
				<li
					key={index}
					className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden items-center text-xl"
				>
					<p className="">
						{transaction.payer} <span className="text-base">付</span>
					</p>
					<div className="flex items-center gap-2">
						<TbArrowBigDownLinesFilled className="text-sage-300 text-2xl my-2" />
						<span className="text-lg text-red-600">NT. {transaction.amount}</span>
					</div>
					<p>{transaction.receiver}</p>
				</li>
			))}
		</ul>
	);
}

export default Transaction;
