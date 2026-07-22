import { createBrowserRouter } from "react-router";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./auth/ProtectedRoute";
import GuestRoute from "./auth/GuestRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
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
