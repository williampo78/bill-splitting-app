import { useState, useEffect } from "react";
import type { Expense, Transaction } from "@/type/transaction";
import { useBillStore } from "@/stores/bill";
import { useStore } from "@/stores/index";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";

interface Member {
  userId: string;
  userName: string;
  paidAmount: number;
  sharedAmount: number;
  difference: number;
}

function Transaction() {
  const { bills } = useBillStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expenses, setExpense] = useState<Expense[]>([]);
  const [costDetails, setCostDetails] = useState<Member[]>([]);

  const { setHeaderTitle } = useStore();

  useEffect(() => {
    setHeaderTitle("結算");
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
    const membersMap = new Map<string, Member>();

    bills.forEach(({ price, paidBy, sharedBy }) => {
      // Update paid amount
      if (!membersMap.has(paidBy.id)) {
        membersMap.set(paidBy.id, {
          userId: String(paidBy.id),
          userName: paidBy.name,
          paidAmount: 0,
          sharedAmount: 0,
          difference: 0,
        });
      }
      membersMap.get(paidBy.id)!.paidAmount += price;

      // Update shared amount
      sharedBy.forEach(({ userId, name, amount }) => {
        if (!membersMap.has(userId)) {
          membersMap.set(userId, {
            userId: String(userId),
            userName: name,
            paidAmount: 0,
            sharedAmount: 0,
            difference: 0,
          });
        }
        membersMap.get(userId)!.sharedAmount += amount;

        // Ensure userName is stored properly
        membersMap.get(userId)!.userName = name;
      });

      membersMap.forEach((member) => {
        member.difference = member.paidAmount - member.sharedAmount;
      });
    });
    setCostDetails(Array.from(membersMap.values()));
  };

  //計算分帳結果
  const splitBills = (): void => {
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

      const payer = payers.reduce((a, b) =>
        balances[a] < balances[b] ? a : b
      );
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
      <ul className="mb-12 border-2 border-gray-400 bg-white rounded-md overflow-hidden">
        {costDetails.map((cost, index) => (
          <li
            key={index}
            className="px-3 py-2 text-xl border-b border-gray-200 last:border-none"
          >
            <div className="flex gap-2 items-center flex-wrap">
              {cost.userName}
              <span className="text-sm ">先付了</span>
              <span className=" text-lg">{cost.paidAmount} 元</span>
              <span className="text-sm ">實際花費</span>
              <span className=" text-lg ">{cost.sharedAmount} 元</span>

              {cost.difference > 0 ? (
                <div>
                  <span className="text-sm  text-green-600 mr-2">拿回</span>
                  <span className=" text-lg text-green-600">
                    {cost.difference} 元
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-sm  text-red-600 mr-2">再付</span>
                  <span className=" text-lg text-red-600">
                    {cost.difference * -1} 元
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
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
                {transaction.amount} 元
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
