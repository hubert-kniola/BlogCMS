import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorPage from "./screens/ErrorPage";
import SwitchPanel from "./screens/SwitchPanel/SwitchPanel";
import MainPage from "./screens/MainPage/MainPage";
import { RootState, store } from "../store/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Category from "./components/Category/Category";
import Contact from "./components/Contact/Contact";
import Configure from "./components/Configure/Configure";
import Posts from "./components/Posts/Posts";
import About from "./components/About/About";
import { AboutMeView } from "./screens/AboutMeView/AboutMeView"
import { ContactView } from "./screens/ContactView/ContactView"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import apolloClient from "./apolloConfig";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin/",
    element: <SwitchPanel />,
    children: [
      {
        path: "",
        element: <Configure />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "aboutMe",
    element: <AboutMeView/>,
  },
  {
    path: "contact",
    element: <ContactView/>,
  },
  {
    path: "main",
    element: <MainPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ApolloProvider>
);
