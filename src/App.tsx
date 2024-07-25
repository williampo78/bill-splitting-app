import Router from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import clsx from 'clsx';

function App() {
	return (
		<div className="min-h-screen flex flex-col font-bold">
			<Header />
			<main className={clsx('bg-sage-100 py-6 px-4', `h-[calc(100vh-108px)]`)}>
				<Router />
			</main>
			<Footer />
		</div>
	);
}

export default App;
