import { useEffect, useState } from "react";
import { getGroupUsersApi, updateGroupUsersApi } from "@/api/user";
// import { useParams } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { useStore } from "@/stores/index";
interface User {
  _id?: string;
  name: string;
}
function Users() {
  const { setHeaderTitle } = useStore();

  //   const { code } = useParams();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setHeaderTitle("編輯成員" || "");
    getUsers();
  }, []);

  const getUsers = async () => {
    const { data } = await getGroupUsersApi("669d0457539ce90562ac344f");
    if (data?.length) {
      setUsers(data as User[]);
    } else {
      setUsers([{ name: "" }]);
    }
    console.log(data);
  };

  const updateUsers = async () => {
    const data = await updateGroupUsersApi("669d0457539ce90562ac344f", {
      users: users,
    });
    console.log(data);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <ul className="flex flex-col gap-2">
        {users.map((user, index) => (
          <li
            key={index}
            className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center"
          >
            <input
              className="flex-1"
              type="text"
              value={user.name}
              onChange={(e) => {
                const copiedUsers = [...users];
                copiedUsers[index].name = e.target.value;
                setUsers(copiedUsers);
              }}
            />
            {users.length > 1 && (
              <button
                onClick={() => {
                  const copiedUsers = [...users];
                  setUsers(copiedUsers.filter((_, i) => i !== index));
                }}
                className="btn bg-red-600 "
              >
                <FaRegTrashAlt />
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => {
            const copiedUsers = [...users];
            if (copiedUsers.at(-1)?.name) {
              copiedUsers.push({ name: "" });
              setUsers(copiedUsers);
            }
          }}
          className="btn bg-teal-300"
        >
          增加成員
        </button>
        <button
          onClick={() => {
            updateUsers();
          }}
          className="btn bg-sage-300 "
        >
          儲存
        </button>
      </div>
    </div>
  );
}

export default Users;
