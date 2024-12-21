import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores/index";
import { createBillApi, showBillAPi, updateBillApi } from "@/api/bill";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { FaRegTrashAlt } from "react-icons/fa";

import { toast } from "react-toastify";

function BillDetail() {
  const params = useParams();

  const { setHeaderTitle, users, groupInfo } = useStore();

  const [item, setItem] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [date, setDate] = useState<Date>(new Date());

  const [paidBy, setPaidBy] = useState<{ _id?: string; name: string } | null>(
    null
  );
  const [sharedBy, setSharedBy] = useState<
    {
      user: {
        _id: string;
        name: string;
      };
      amount: number | string;
      isDefault: boolean;
    }[]
  >([
    {
      user: {
        _id: "",
        name: "",
      },
      amount: 0,
      isDefault: true,
    },
  ]);

  const [sharedByLength, setSharedByLength] = useState(sharedBy.length);

  useEffect(() => {
    if (params.id) {
      getBillInfo();
      setHeaderTitle("編輯項目");
    } else {
      setHeaderTitle("新增項目");
    }
  }, []);

  useEffect(() => {
    setSharedByLength(sharedBy.length);
  }, [sharedBy]);

  useEffect(() => {
    calculateSharedAmount();
  }, [sharedByLength, price]);

  const submitData = useMemo(() => {
    return {
      groupId: groupInfo._id,
      item: item,
      price: price,
      paidBy: paidBy?._id || "",
      sharedBy: sharedBy.map((item) => {
        return { userId: item.user._id!, amount: item.amount };
      }),
      payingTime: date,
    };
  }, [groupInfo, item, price, paidBy, sharedBy, date]);

  const totalSharedAmount = useMemo(() => {
    return sharedBy.reduce((accum, current) => {
      return accum + +current.amount;
    }, 0);
  }, [sharedBy]);

  const addSharedBy = () => {
    setSharedBy([
      ...sharedBy,
      { user: { _id: "", name: "" }, amount: 0, isDefault: true },
    ]);
  };

  const save = async () => {
    console.log(totalSharedAmount);
    const amountDifference = +price - totalSharedAmount;
    if (amountDifference >= 1) {
      toast.error(`還須補足${amountDifference}元`);
      return;
    }
    if (amountDifference <= -1) {
      toast.error(`多分了${amountDifference * -1}元`);
      return;
    }
    try {
      if (params.id) {
        await updateBillApi(params.id, submitData);
      } else {
        await createBillApi(submitData);
        clearBillData();
      }
      toast.success("儲存成功");
    } catch (error) {
      toast.error("儲存失敗");
    }
  };

  const clearBillData = () => {
    setItem("");
    setPrice("");
    setPaidBy({ _id: "", name: "" });
    setSharedBy([{ user: { _id: "", name: "" }, amount: 0, isDefault: true }]);
    setDate(new Date());
  };

  const getBillInfo = async () => {
    const { data } = await showBillAPi(params.id!);
    const paidByUser = users.find((user) => user._id === data.paidBy) || null;
    const sharedByUsers =
      data.sharedBy.map((share) => {
        return {
          user: users.find((user) => user._id === share.userId) || {
            _id: "",
            name: "",
          },
          amount: share.amount,
        };
      }) || [];
    setPaidBy(paidByUser);
    setItem(data.item);
    setPrice(data.price);
    setSharedBy(sharedByUsers);
    setDate(data.payingTime);
  };

  //自動計算要分的錢
  const calculateSharedAmount = () => {
    const _sharedBy = [...sharedBy];
    let manualUpdatedLength = 0;
    const totalManualAmount = sharedBy.reduce((accum, current) => {
      if (!current.isDefault) {
        manualUpdatedLength++;
        return +current.amount + accum;
      }
      return accum;
    }, 0);

    _sharedBy.forEach((s) => {
      if (s.isDefault) {
        s.amount = (
          (+price - totalManualAmount) /
          (sharedBy.length - manualUpdatedLength)
        ).toFixed(2);
      }
    });
    setSharedBy(_sharedBy);
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
              const _sharedBy = [...sharedBy];
              _sharedBy.forEach((s) => {
                s.isDefault = true;
              });
              setSharedBy(_sharedBy);
            }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="">誰出錢</label>
        <Select
          className="w-full bg-white !border-2 !border-gray-400 !rounded-md  "
          value={paidBy}
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
              options={users.filter(
                (user) => !sharedBy.find((s) => s.user._id === user._id)
              )}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
            />
            <div className="px-3  border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
              <input
                id="price"
                className="flex-1"
                type="number"
                value={user.amount}
                onChange={(e) => {
                  const newSharedBy = [...sharedBy];
                  newSharedBy[index].amount = e.target.value
                    ? +e.target.value
                    : 0;
                  if (+e.target.value >= 0) {
                    newSharedBy[index].isDefault = false;
                  } else {
                    newSharedBy[index].isDefault = true;
                  }
                  setSharedBy(newSharedBy);
                }}
              />
            </div>
            {sharedBy.length > 1 && (
              <button
                onClick={() => {
                  const _sharedBy = [...sharedBy];
                  setSharedBy(sharedBy.filter((_, i) => i !== index));
                }}
                className="btn bg-red-600 "
              >
                <FaRegTrashAlt />
              </button>
            )}
          </div>
        ))}
        {sharedBy.length < users.length && (
          <button onClick={addSharedBy} className=" text-cyan-900">
            +增加分母
          </button>
        )}
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
          儲存
        </button>
      </div>
    </div>
  );
}

export default BillDetail;
