import { useParams, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import clsx from 'clsx';

function App() {
	const params = useParams();
	console.log('app params', params);

	return (
		<div className="min-h-screen flex flex-col font-bold bg-sage-100">
			<Header />
			{/* <main className={clsx("bg-sage-100 py-6 px-4", `h-[calc(100vh-108px)]`)}> */}
			<main className={clsx('py-6 px-4 flex-1 mb-16 w-full md:max-w-[700px] mx-auto')}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default App;
