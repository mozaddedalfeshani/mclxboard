import { RouterProvider } from "react-router";

import ReactDOM from "react-dom/client";

import router from "./routes/router";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
} else {
  console.error("Root element not found");
}
