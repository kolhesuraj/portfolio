import { NotFound, EmailTemplateEditor } from "@/pages";
import { Navigate } from "react-router-dom";

const privatePagesRoutes = [
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "/email-template-editor",
    element: <EmailTemplateEditor />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

export default privatePagesRoutes;
