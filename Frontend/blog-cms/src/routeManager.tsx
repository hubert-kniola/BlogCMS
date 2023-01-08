import React from "react";
import { RouteObject } from "react-router-dom";
import { CategoryPage, ErrorPage, PostPage } from "./screens";
import { CategoryType, RouteObjectType } from "./types";

const getCategoryRoute = (path: string): RouteObject => {
  return {
    path: `${path}`,
    element: <CategoryPage />,
    errorElement: <ErrorPage />,
  };
};

const getPostRoute = (path: string): RouteObject => {
  return {
    path: path,
    element: <PostPage />,
    errorElement: <ErrorPage />,
  };
};

export const generateRoute = (menu: CategoryType[]): RouteObject[] => {
  let routeObject = [] as RouteObject[];

  menu.forEach((item) => {
    if (item.objectType === RouteObjectType.Category) {
      routeObject.push(getCategoryRoute(item.path));
    } else if (item.objectType === RouteObjectType.Post) {
      routeObject.push(getPostRoute(item.path));
    }
  });

  return routeObject;
};
