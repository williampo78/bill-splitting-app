import { useEffect } from "react";
import { getBillsAPi } from "@/api/bill";
import { useParams, useNavigate } from "react-router-dom";
import type { Bill } from "@/type/bill";

// import { AiTwotoneEdit } from "react-icons/ai";
import { useStore } from "@/stores/index";
import { useBillStore } from "@/stores/bill";

function Bills() {
  const navigate = useNavigate();
  const { setHeaderTitle, groupInfo } = useStore();
  const { bills, setBills } = useBillStore();

  const { code } = useParams();

  useEffect(() => {
    getBills();
  },[]);

  const getBills = async () => {
    const { data } = await getBillsAPi({ groupId: groupInfo._id });
    setBills((data.bills as Bill[]) || []);
    setHeaderTitle(data.groupName || "");
    console.log(bills);
  };

  const getResult = () => {
    navigate(`/group/${code}/transactions`);
  };

  return (
    <div className="">
      {bills?.length ? (
        <>
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
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                getResult();
              }}
              className="btn bg-teal-300 text-white rounded-md text-lg"
            >
              結算
            </button>
          </div>
        </>
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
    </div>
  );
}

export default Bills;
