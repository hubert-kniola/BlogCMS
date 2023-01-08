import { ApolloProvider, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { store } from "../store/store";
import apolloClient from "./apollo/apolloConfig";
import { GET_ROUTE } from "./apollo/apolloQueries";
import { About, Category, Configure, Contact, Posts } from "./components";
import "./index.css";
import { generateRoute } from "./routeManager";
import {
  AboutMePage,
  ContactPage,
  ErrorPage,
  GuestSwitchPanel,
  MainPage,
  SwitchPanel,
} from "./screens";
import { SendFiles } from "./screens/SendFiles/SendFiles";
import { CategoryType, RouteObjectType } from "./types";

const menu: CategoryType[] = [
  {
    title: "services",
    path: "services",
    subCategory: [
      {
        title: "web design",
        path: "web-design",
        objectType: RouteObjectType.Category,
      },
      {
        title: "web development",
        path: "web-dev",
        objectType: RouteObjectType.Category,
        subCategory: [
          {
            title: "Backend",
            path: "b-end",
            objectType: RouteObjectType.Category,
            subCategory: [
              {
                title: ".NET",
                path: "dotnet",
                objectType: RouteObjectType.Category,
              },
              {
                title: "Python",
                path: "python",
                objectType: RouteObjectType.Category,
              },
            ],
          },
          {
            title: "Frontend",
            path: "f-end",
            objectType: RouteObjectType.Category,
          },
        ],
      },
      { title: "SEO", path: "seo", objectType: RouteObjectType.Category },
    ],
  },
];

const basicRouter = [
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
] as RouteObject[];

const MainRouteProvider = () => {
  const {
    loading: loadingData,
    error: errorData,
    data: menuItemData,
  } = useQuery(GET_ROUTE);
  const [menu, setMenu] = useState<CategoryType[]>();
  const [oneLvlRouter, setOneLvlRouter] = useState<RouteObject[]>();

  const getCategoryData = (data: any): CategoryType[] => {
    return data?.category;
  };

  useEffect(() => {
    if (!loadingData) {
      setMenu(getCategoryData(menuItemData));
    }
  }, [loadingData]);

  useEffect(() => {
    if (menu) {
      setOneLvlRouter(generateRoute(menu));
    }
  }, [menu]);

  return (
    <>
      {menu && !loadingData && oneLvlRouter && (
        <RouterProvider
          router={createBrowserRouter([...basicRouter, ...oneLvlRouter])}
        />
      )}
    </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <MainRouteProvider />
    </Provider>
  </ApolloProvider>
);
