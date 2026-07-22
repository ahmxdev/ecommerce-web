import { createBrowserRouter } from "react-router";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);
