import { useParams, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import clsx from 'clsx';

function App() {
	const params = useParams();
	console.log('app params', params);

	return (
		<div className="min-h-screen flex flex-col font-bold bg-sage-100">
			<Header />
			{/* <main className={clsx("bg-sage-100 py-6 px-4", `h-[calc(100vh-108px)]`)}> */}
			<main className={clsx('py-6 px-4 flex-1 mb-16')}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default App;
