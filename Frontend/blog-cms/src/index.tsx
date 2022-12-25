import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "../store/store";
import apolloClient from "./apolloConfig";
import { About, Category, Configure, Contact, Posts } from "./components";
import "./index.css";
import { AboutMePage, ContactPage, ErrorPage, GuestSwitchPanel, MainPage, PostPage, SwitchPanel } from "./screens";
import { AboutMeView } from "./screens/AboutMeView/AboutMeView";
import { ContactView } from "./screens/ContactView/ContactView";
import { SendFiles } from "./screens/SendFiles/SendFiles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestSwitchPanel />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "aboutMe",
        element: <AboutMePage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ]
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
    path: "/:title/:id",
    element: <PostPage />,
  },
  {
    path: "/sendfiles",
    element: <SendFiles />,
  },
  {
    path: "aboutMe",
    element: <AboutMeView />,
  },
  {
    path: "contact",
    element: <ContactView />,
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
