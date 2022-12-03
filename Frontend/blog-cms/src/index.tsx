import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "../store/store";
import apolloClient from "./apolloConfig";
import { About, Category, Configure, Contact, Posts } from "./components";
import "./index.css";
import { AboutMePage, ContactPage, ErrorPage, MainPage, PostPage, SwitchPanel } from "./screens";

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
    element: <AboutMePage />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
  {
    path: "main",
    element: <MainPage />,
  },
  {
    path: "/:title/:id",
    element: <PostPage />,
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
