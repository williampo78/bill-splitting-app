import { RouteObject, useRoutes } from 'react-router-dom';
import Home from '@/pages/Index';
import About from '@/pages/About';
import Group from '@/pages/Group/Create';
import Bills from '@/pages/Bills';
import Users from '@/pages/Users';

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
		{
			path: '/group/create',
			element: <Group />,
		},
		{
			path: '/group/:code/bills',
			element: <Bills />,
		},
		{
			path: '/group/:code/users',
			element: <Users />,
		},
	];

	return useRoutes(routes);
}

export default Router;
