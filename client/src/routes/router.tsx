import { createBrowserRouter } from "react-router";

import Page404 from "../Pages/Page404";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    // error page
    path: "*",
    element: <Page404 />,
  },
]);
export default router;
