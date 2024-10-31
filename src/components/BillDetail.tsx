import { useState, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "@/stores/index";
import { createBillApi } from "@/api/bill";
import DatePicker from "react-datepicker";
import Select from "react-select";

function BillDetail() {
  const { users, groupInfo } = useStore();

  const { pathname } = useLocation();
  const createPage = useRef(pathname.includes("create"));
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());

  const [paidBy, setPaidBy] = useState<{ _id: string; name: string } | null>(
    null
  );
  const [sharedBy, setSharedBy] = useState<
    {
      user: {
        _id: string;
        name: string;
      };
      amount: number;
    }[]
  >([
    {
      user: {
        _id: "",
        name: "",
      },
      amount: 0,
    },
  ]);

  const submitData = useMemo(() => {
    return {
      groupId: groupInfo._id,
      item: item,
      price: price,
      paidBy: paidBy,
      sharedBy: sharedBy.map((item) => {
        return { userId: item.user._id, amount: item.amount };
      }),
      payingTime: date,
    };
  }, [groupInfo, item, price, paidBy, sharedBy, date]);

  const addSharedBy = () => {
    setSharedBy([...sharedBy, { user: { _id: "", name: "" }, amount: 0 }]);
  };

  const save = async () => {
    await createBillApi(submitData);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label htmlFor="item">品項</label>
        <div className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
          <input
            id="item"
            className="flex-1"
            type="text"
            value={item}
            onChange={(e) => {
              setItem(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="price">金額</label>
        <div className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
          <input
            id="price"
            className="flex-1"
            type="number"
            min={0}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="">誰出錢</label>
        <Select
          className="w-full bg-white !border-2 !border-gray-400 !rounded-md  "
          defaultValue={paidBy}
          onChange={setPaidBy}
          options={users}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option._id}
        />
      </div>
      <div>
        <label htmlFor="sharedBy">分給誰</label>

        {sharedBy.map((user, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <Select
              className="w-full bg-white border-2 !border-gray-400 !rounded-md  "
              value={sharedBy[index].user}
              onChange={(option) => {
                const newSharedBy = [...sharedBy];
                newSharedBy[index].user = {
                  _id: option?._id || "", // Ensure _id has a default value
                  name: option?.name || "",
                };
                setSharedBy(newSharedBy);
              }}
              options={users}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
            />
            <div className="px-3  border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
              <input
                id="price"
                className="flex-1"
                type="number"
                value={user.amount || ""}
                onChange={(e) => {
                  const newSharedBy = [...sharedBy];
                  newSharedBy[index].amount = e.target.value
                    ? +e.target.value
                    : 0;
                  setSharedBy(newSharedBy);
                }}
              />
            </div>
          </div>
        ))}
        <button onClick={addSharedBy} className=" text-cyan-900">
          +增加分母
        </button>
      </div>
      <div>
        <label htmlFor="" />
      </div>
      <div>
        <label htmlFor="">日期</label>
        <div className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
          <DatePicker
            selected={date}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => setDate(date!)}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            save();
          }}
          className="btn bg-sage-300"
        >
          {createPage.current ? "新增" : "儲存"}
        </button>
      </div>
    </div>
  );
}

export default BillDetail;
