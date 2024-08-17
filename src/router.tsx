import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Index";
import Group from "@/pages/Group/Create";
import Bills from "@/pages/Bills";
import Users from "@/pages/Users";

function Router() {
  const routes: RouteObject[] = [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/group/create",
          element: <Group />,
        },
        {
          path: "/group/:code/bills",
          element: <Bills />,
        },
        {
          path: "/group/:code/users",
          element: <Users />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}

export default Router;
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
