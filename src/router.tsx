import { RouteObject, useRoutes } from 'react-router-dom';
import Home from '@/pages/Index';
import About from '@/pages/About';

function Router() {
	const routes: RouteObject[] = [
		// {
		//   path: "/",
		//   element: <Layout />,
		//   children: [
		//     {
		//       path: RoutePath.HOME,
		//       element: <Home />,
		//     },
		//     {
		//       path: RoutePath.ROLES_LIST,
		//       element: lazyRoute(() => import("../pages/Roles/List")),
		//     },
		//   ],
		// },
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/about',
			element: <About />,
		},
	];

	return useRoutes(routes);
}

export default Router;
