import { useEffect, useState } from "react";
import { getBillsAPi } from "@/api/bill";
import { useParams, useNavigate } from "react-router-dom";

// import { AiTwotoneEdit } from "react-icons/ai";
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
  const navigate = useNavigate();
  const { setHeaderTitle, groupInfo } = useStore();

  const { code } = useParams();
  console.log(code);

  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    getBills();
  }, []);

  const getBills = async () => {
    const { data } = await getBillsAPi({ groupId: groupInfo._id });
    setBills((data.bills as Bill[]) || []);
    setHeaderTitle(data.groupName || "");
  };

  return (
    <div className="">
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
    </div>
  );
}

export default Bills;
