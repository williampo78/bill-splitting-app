import { useEffect, useState } from 'react';
import { getBillsAPi } from '@/api/bill';
import { useParams, useNavigate } from 'react-router-dom';
import type { Expense, SplitBillsResult } from '@/type/transaction';
import type { Bill } from '@/type/bill';

// import { AiTwotoneEdit } from "react-icons/ai";
import { useStore } from '@/stores/index';
import { useBillStore } from '@/stores/bill';

function Bills() {
	const navigate = useNavigate();
	const { setHeaderTitle, groupInfo } = useStore();
	const { bills, setBills } = useBillStore();

	const { code } = useParams();

	useEffect(() => {
		getBills();
	}, []);

	const getBills = async () => {
		const { data } = await getBillsAPi({ groupId: groupInfo._id });
		setBills((data.bills as Bill[]) || []);
		setHeaderTitle(data.groupName || '');
		console.log(bills);
	};

	function splitBills(expenses: Expense[]): SplitBillsResult {
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
		let transactions = [];
		while (true) {
			let payers = Object.keys(balances).filter((person) => balances[person] < -0.01);
			let receivers = Object.keys(balances).filter((person) => balances[person] > 0.01);
			if (payers.length === 0 || receivers.length === 0) break;

			let payer = payers.reduce((a, b) => (balances[a] < balances[b] ? a : b));
			let receiver = receivers.reduce((a, b) => (balances[a] > balances[b] ? a : b));
			let amount = Math.min(-balances[payer], balances[receiver]);

			balances[payer] += amount;
			balances[receiver] -= amount;

			transactions.push({
				payer,
				receiver,
				amount: amount.toFixed(2),
			});
		}

		return { transactions, totalContributions };
	}

	const expenses = bills.map((bill) => {
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

	const getResult = (expenses: Expense[]) => {
		// const { transactions, totalContributions } = splitBills(expenses);

		navigate(`/group/${code}/transactions`);


		// if (transactions.length > 0) {
		// 	// console.log('\nTransactions:');
		// 	transactions.forEach((transaction) => {
		// 		console.log(`${transaction.payer} pays ${transaction.amount} to ${transaction.receiver}`);
		// 	});

		// 	console.log('\nTotal Contributions:');
		// 	for (let contributor in totalContributions) {
		// 		console.log(
		// 			`${contributor} contributed a total of ${totalContributions[contributor].toFixed(2)}`
		// 		);
		// 	}
		// } else {
		// 	console.log('No transactions needed.');
		// }
	};

	return (
		<div className="">
			{bills?.length ? (
				<ul className="flex flex-col gap-2">
					{bills.map((bill, index) => (
						<li
							onClick={() => {
								navigate(`/group/${code}/bills/update/${bill._id}`);
							}}
							key={index}
							className="p-3 border-2 border-gray-400 bg-white  rounded-md overflow-hidden flex justify-between items-center cursor-pointer"
						>
							<div>
								<p className="text-xl">{bill.item}</p>
								<p className="text-gray-400 text-sm">{bill.paidBy?.name} 先付</p>
							</div>
							<p className="text-red-600 font-bold">NT${bill.price}</p>
							{/* <button>
							<AiTwotoneEdit className="w-6 h-6 text-gray-400" />
						</button> */}
						</li>
					))}
				</ul>
			) : (
				<div className="text-center">
					<p className="text-2xl">還沒有任何項目</p>
					<button
						onClick={() => {
							navigate(`/group/${code}/bills/create`);
						}}
						className="py-2 px-3 rounded-md bg-teal-300 text-white text-lg mt-5"
					>
						新增項目
					</button>
				</div>
			)}
			<div className="flex justify-center mt-6">
				<button
					onClick={() => {
						getResult(expenses);
					}}
					className="btn bg-teal-300 text-white rounded-md text-lg"
				>
					結算
				</button>
			</div>
		</div>
	);
}

export default Bills;
