import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "@/stores/index";
import { FaChevronLeft, FaXmark } from "react-icons/fa6";
import { useState } from "react";

function Header() {
  // const headerTitle = useStore((state) => state.headerTitle);
  const { headerTitle, groupInfo } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [editNameModal, setEditNameModal] = useState(true);

  return (
    <>
      <div className="relative">
        <header className="bg-sage-200 w-full px-4 py-2 text-white text-center text-xl sticky top-0">
          {location.pathname !== "/" && (
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2"
            >
              <FaChevronLeft />
            </button>
          )}
          {/* <Link to={`/group/${groupInfo.code}/bills`}>
          {headerTitle || "分帳趣"}
          </Link> */}
          {headerTitle || "分帳趣"}
        </header>
        {/* {editNameModal && (
          <div className="absolute top-0 left-0 w-screen h-screen  bg-black/50 overflow-hidden text-black z-50 flex justify-center items-start pt-[20vh]  px-6">
            <div className="w-[540px] p-6 bg-white rounded-xl relative">
              <button className="absolute right-4 top-4" onClick={() => {
                setEditNameModal(false);
              }}>
                <FaXmark />
              </button>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Header;
