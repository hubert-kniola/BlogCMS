import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import ErrorPage from "../src/screens/ErrorPage";
import SwitchPanel from "./screens/SwitchPanel/SwitchPanel";
import { RootState, store } from "../store/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin",
    element: <SwitchPanel/>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
