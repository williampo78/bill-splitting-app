import { AiOutlineUsergroupAdd, AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { code } = useParams();

  return (
    <footer className="px-4 py-1 flex justify-between items-center text-sm text-sage-500">
      {pathname !== "/" ? (
        <>
          <button
            onClick={() => {
              navigate(`/group/${code}/users`);
            }}
            className="flex flex-col items-center"
          >
            <AiOutlineUsergroupAdd className="w-8 h-8 " />
            編輯成員
          </button>
          <button className="flex flex-col items-center">
            <AiOutlinePlus className="w-8 h-8" />
            新增帳本
          </button>{" "}
        </>
      ) : null}
    </footer>
  );
}

export default Footer;
