import { useRoutes } from "react-router-dom";
import privatePagesRoutes from "./private-pages";
import { PortFolio } from "@/pages";

export default function AppRouter() {
  const routes = useRoutes([
    { path: "/", element: <PortFolio /> },
    ...privatePagesRoutes,
  ]);

  return routes;
}
