import { useEffect, useState } from "react";
import { getBillsAPi } from "@/api/bill";
import { useParams } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import { useStore } from "@/stores/index";
interface Bill {
  _id: string;
  item: string;
  groupId: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}
function Bills() {
  const { setHeaderTitle } = useStore();

  const { code } = useParams();
  console.log(code);

  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    getBills();
  }, []);

  const getBills = async () => {
    const { data } = await getBillsAPi({ code: code as string });
    setBills((data.bills as Bill[]) || []);
    setHeaderTitle(data.groupName || "");
  };

  return (
    <div className="">
      <ul className="flex flex-col gap-2">
        {bills.map((bill, index) => (
          <li
            key={index}
            className="p-3 border-2 border-gray-400 bg-white  rounded-md overflow-hidden flex  justify-between items-center"
          >
            <span className="text-xl">{bill.item}</span>

            <p className="text-red-600 font-bold">NT {bill.price}</p>
            {/* <button>
							<AiTwotoneEdit className="w-6 h-6 text-gray-400" />
						</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bills;
