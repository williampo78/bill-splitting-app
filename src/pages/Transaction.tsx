import { useState, useEffect } from "react";
import type {
  Expense,
  Transaction,
  SplitBillsResult,
} from "@/type/transaction";
import { useBillStore } from "@/stores/bill";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";

function Transaction() {
  const { bills } = useBillStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expenses, setExpense] = useState<Expense[]>([]);
  const [costDetails, setCostDetsails] = useState<
    {
      userId: string;
      userName: string;
      paidAmount: number;
      sharedAmount?: number;
    }[]
  >([]);

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
    console.log("bills", bills);
    const result: {
      userId: string;
      userName: string;
      paidAmount: number;
      sharedAmount?: number;
    }[] = [];
    bills.forEach((bill) => {
      const currentPerson = result.find((r) => r.userId === bill.paidBy.id);
      console.log("currentPerson", currentPerson);

      if (currentPerson) {
        currentPerson.paidAmount += bill.price;
      } else {
        result.push({
          userId: bill.paidBy.id,
          userName: bill.paidBy.name,
          paidAmount: bill.price,
        });
      }
    });
    console.log("result", result);
    setCostDetsails(result);
  };

  //計算分帳結果
  const splitBills = (): void => {
    console.log(expenses);

    const totalExpenses: Record<string, number> = {};
    const people = new Set<string>();
    const totalContributions: Record<string, number> = {}; // Track total contributions for each contributor

    // Calculate total contributions and track participants
    for (const expense of expenses) {
      for (const contribution of expense.contributions) {
        const { person, amount } = contribution;
        people.add(person);

        // Track total contributions
        if (!(person in totalContributions)) totalContributions[person] = 0;
        totalContributions[person] += amount;

        if (!(person in totalExpenses)) totalExpenses[person] = 0;
        totalExpenses[person] += amount;
      }
    }

    // Initialize fair shares for all participants
    const fairShares: Record<string, number> = {};
    people.forEach((person) => (fairShares[person] = 0));

    // Distribute shares based on customShares
    for (const expense of expenses) {
      if (expense.customShares) {
        for (const { person, share } of expense.customShares) {
          people.add(person); // Ensure all participants are tracked
          if (!(person in fairShares)) fairShares[person] = 0;
          fairShares[person] += share;
        }
      }
    }

    // Calculate each person's balance
    const balances: Record<string, number> = {};
    people.forEach((person) => {
      balances[person] =
        (totalExpenses[person] || 0) - (fairShares[person] || 0);
    });

    // Settle debts
    const _transactions = [];
    while (true) {
      const payers = Object.keys(balances).filter(
        (person) => balances[person] < -0.01
      );
      const receivers = Object.keys(balances).filter(
        (person) => balances[person] > 0.01
      );
      if (payers.length === 0 || receivers.length === 0) break;

      const payer = payers.reduce((a, b) => (balances[a] < balances[b] ? a : b));
      const receiver = receivers.reduce((a, b) =>
        balances[a] > balances[b] ? a : b
      );
      const amount = Math.min(-balances[payer], balances[receiver]);

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
    <>
      {/* <ul className="mb-12 border-2 border-gray-400 bg-white rounded-md overflow-hidden">
        {costs.map((cost, index) => (
          <li key={index} className="px-3 py-2 text-xl">
            <p>
              {cost.userName}代墊
              <span className="text-lg text-blue-600">
                NT. {cost.cost.toFixed(2)}
              </span>
            </p>
          </li>
        ))}
      </ul> */}
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
              <span className="text-lg text-red-600">
                NT. {transaction.amount}
              </span>
            </div>
            <p>{transaction.receiver}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Transaction;
