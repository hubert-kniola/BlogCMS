import React from "react";
import { RouteObject } from "react-router-dom";
import { CategoryPage, ErrorPage, PostPage } from "./screens";
import { MenuItemType } from "./types";

const getCleanPath = (path: string): string => {
  if (path.endsWith("/")) {
    path = path.slice(-1);
  }

  return path;
};

const getCategoryRoute = (path: string): RouteObject => {
  return {
    path: `${path}`,
    element: <CategoryPage />,
    errorElement: <ErrorPage />,
  };
};

const getPostRoute = (path: string): RouteObject => {
  return {
    path: `${getCleanPath(path)}/:id`,
    element: <PostPage />,
    errorElement: <ErrorPage />,
  };
};

export const generateOneLevelRoute = (menu: MenuItemType[]): RouteObject[] => {
  let routeObject = [] as RouteObject[];

  menu.forEach((item) => {
    routeObject.push(getCategoryRoute(item.path));
    routeObject.push(getPostRoute(item.path));

    if (item.subMenu) {
      routeObject.push(...generateOneLevelRoute(item.subMenu));
    }
  });
  return routeObject;
};
