import { Link } from 'react-router-dom';
import { useStore } from '@/stores/index';

function Header() {
	const headerTitle = useStore((state) => state.headerTitle);

	return (
		<>
			<header className="bg-sage-200 w-full px-4 py-2 text-white text-center text-3xl">
				<Link to="/">{headerTitle || '分帳趣'}</Link>
			</header>
		</>
	);
}

export default Header;
