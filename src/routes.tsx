import { createBrowserRouter } from "react-router";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
