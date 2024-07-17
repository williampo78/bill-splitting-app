import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="bg-sage-200 w-full px-4 py-2 text-white text-center text-3xl">
        <Link to="/">分帳趣</Link>
      </header>
    </>
  );
}

export default Header;
