import { useEffect, useState } from "react";
import { getBillsAPi } from "@/api/bill";
import { useParams, useNavigate } from "react-router-dom";

// import { AiTwotoneEdit } from "react-icons/ai";
import { useStore } from "@/stores/index";
interface Bill {
  _id: string;
  item: string;
  paidBy: { _id: string; name: string };
  sharedBy: { _id: string; userId: string; name: string; amount: number }[];
  groupId: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

function Bills() {
  const navigate = useNavigate();
  const { setHeaderTitle, groupInfo } = useStore();

  const { code } = useParams();

  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    getBills();
  }, []);

  const getBills = async () => {
    const { data } = await getBillsAPi({ groupId: groupInfo._id });
    setBills((data.bills as Bill[]) || []);
    setHeaderTitle(data.groupName || "");
    console.log(bills);
  };

  function splitBills(expenses) {
    let totalExpenses = {};
    let people = new Set();

    // Calculate total expenses per person and track all people involved
    for (let expense of expenses) {
      for (let contribution of expense.contributions) {
        let person = contribution.person;
        let amount = contribution.amount;
        people.add(person);
        if (!(person in totalExpenses)) {
          totalExpenses[person] = 0;
        }
        totalExpenses[person] += amount;
      }
    }

    // Initialize fair shares for each person
    let fairShares = {};
    people.forEach((person) => (fairShares[person] = 0));

    // Calculate fair share for each person
    for (let expense of expenses) {
      let expenseTotal = expense.contributions.reduce(
        (sum, contribution) => sum + contribution.amount,
        0
      );
      if (expense.customShares) {
        // Handle customShares as an array
        for (let customShare of expense.customShares) {
          let { person, share } = customShare;
          fairShares[person] += share;
        }
      } else {
        let participants = expense.contributions.map(
          (contribution) => contribution.person
        );
        let share = expenseTotal / participants.length;
        for (let person of participants) {
          fairShares[person] += share;
        }
      }
    }

    // Calculate balances
    let balances = {};
    for (let person of people) {
      balances[person] = (totalExpenses[person] || 0) - fairShares[person];
    }

    // Settle balances
    let transactions = [];
    while (true) {
      let payers = Object.keys(balances).filter(
        (person) => balances[person] < 0
      );
      let receivers = Object.keys(balances).filter(
        (person) => balances[person] > 0
      );
      if (payers.length === 0 || receivers.length === 0) break;

      let payer = payers.reduce((a, b) => (balances[a] < balances[b] ? a : b));
      let receiver = receivers.reduce((a, b) =>
        balances[a] > balances[b] ? a : b
      );
      let amount = Math.min(-balances[payer], balances[receiver]);

      balances[payer] += amount;
      balances[receiver] -= amount;
      transactions.push({
        payer,
        receiver,
        amount: amount.toFixed(2),
      });
    }

    return transactions;
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

  // Example usage
  //   const expenses = [
  //     {
  //       title: "Hotel",
  //       contributions: [
  //         { person: "Alice", amount: 0 },
  //         { person: "Bob", amount: 0 },
  //         { person: "Charlie", amount: 120 },
  //         { person: "David", amount: 0 },
  //       ],
  //     },
  //     {
  //       title: "Ticket",
  //       contributions: [
  //         { person: "Alice", amount: 0 },
  //         { person: "Bob", amount: 40 },
  //         { person: "Charlie", amount: 80 },
  //         { person: "David", amount: 0 },
  //       ],
  //     },
  //     {
  //       title: "Meal",
  //       contributions: [
  //         { person: "Alice", amount: 50 },
  //         { person: "Bob", amount: 90 },
  //         { person: "David", amount: 0 },
  //       ],
  //       customShares: {
  //         Alice: 25,
  //         Bob: 25,
  //         David: 60,
  //       },
  //     },
  //     {
  //       title: "Taxi",
  //       contributions: [
  //         { person: "Bob", amount: 40 },
  //         { person: "Alice", amount: 0 },
  //         { person: "Charlie", amount: 0 },
  //       ],
  //     },
  //   ];

  const getResult = (expenses) => {
    const result = splitBills(expenses);

    if (result.length > 0) {
      console.log("\nTransactions:");
      result.forEach((transaction) => {
        console.log(
          `${transaction.payer} pays ${transaction.amount} to ${transaction.receiver}`
        );
      });
    } else {
      console.log("No transactions needed.");
    }
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
                <p className="text-gray-400 text-sm">
                  {bill.paidBy?.name} 先付
                </p>
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
      <button
        onClick={() => {
          getResult(expenses);
        }}
        className="mt-6 py-2 px-3 bg-teal-800 text-white rounded-md"
      >
        計算
      </button>
    </div>
  );
}

export default Bills;
