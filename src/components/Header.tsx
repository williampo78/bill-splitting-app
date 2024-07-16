import { Link } from 'react-router-dom';

function Header() {
	return (
		<>
			<header className=" bg-sage-200 w-full p-4 text-white text-center text-3xl">
				<Link to="/">分帳趣</Link>
			</header>
		</>
	);
}

export default Header;
