import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "@/stores/index";
import { FaChevronLeft } from "react-icons/fa6";

function Header() {
  const headerTitle = useStore((state) => state.headerTitle);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <header className="bg-sage-200 w-full px-4 py-2 text-white text-center text-3xl relative">
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
        <Link to="/">{headerTitle || "分帳趣"}</Link>
      </header>
    </>
  );
}

export default Header;
