import { createBrowserRouter } from "react-router";

import Test from "./pages/test";

export const router = createBrowserRouter([
  {
    path: "/test",
    element: <Test />,
  },
]);
