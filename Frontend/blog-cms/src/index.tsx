import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "../store/store";
import apolloClient from "./apollo/apolloConfig";
import { About, Category, Configure, Contact, Posts } from "./components";
import "./index.css";
import {
  AboutMePage,
  ContactPage,
  ErrorPage,
  GuestSwitchPanel,
  MainPage,
  SwitchPanel,
} from "./screens";
import { SendFiles } from "./screens/SendFiles/SendFiles";
import { MenuItemType, RouteObjectType } from "./types";
import { generatePath } from "./routeManager";

const menu: MenuItemType[] = [
  {
    title: "services",
    path: "services",
    subMenu: [
      {
        title: "web design",
        path: "web-design",
        routeObjectType: RouteObjectType.Category,
      },
      {
        title: "web development",
        path: "web-dev",
        routeObjectType: RouteObjectType.Category,
        subMenu: [
          {
            title: "Backend",
            path: "b-end",
            routeObjectType: RouteObjectType.Category,
            subMenu: [
              {
                title: ".NET",
                path: "dotnet",
                routeObjectType: RouteObjectType.Category,
              },
              {
                title: "Python",
                path: "python",
                routeObjectType: RouteObjectType.Category,
              },
            ],
          },
          {
            title: "Frontend",
            path: "f-end",
            routeObjectType: RouteObjectType.Category,
          },
        ],
      },
      { title: "SEO", path: "seo", routeObjectType: RouteObjectType.Category },
    ],
  },
];

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
    ],
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
    path: "sendfiles",
    element: <SendFiles />,
  },
  {
    path: "aboutMe",
    element: <AboutMePage />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
  ...generatePath(menu),
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
