import { createBrowserRouter } from "react-router";

import Page404 from "../Pages/Page404";
import App from "../App";
import Board from "../Pages/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Board />,
      },
    ],
  },
  {
    // error page
    path: "*",
    element: <Page404 />,
  },
]);
export default router;
