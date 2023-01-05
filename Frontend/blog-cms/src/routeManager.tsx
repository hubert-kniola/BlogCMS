import React from "react";
import { RouteObject } from "react-router-dom";
import { CategoryPage, PostPage } from "./screens";
import { MenuItemType } from "./types";

let oneLevelRoute = [] as RouteObject[];

const getCleanPath = (path: string): string => {
  if (path.startsWith("/")) {
    path = path.substring(1);
  }

  if (path.startsWith("\\")) {
    path = path.slice(-1);
  }

  return path;
};

const getPostRoute = (path: string): RouteObject => {
  return {
    path: `${path}/:id`,
    element: <PostPage />,
  };
};

export const generatePath = (
  menu: MenuItemType[],
  parentPath?: string
): RouteObject[] => {
  menu.forEach((item) => {
    item.path = getCleanPath(item.path);
    let path = `${parentPath ? parentPath : ""}/${item.path}`;
    oneLevelRoute = [
      ...oneLevelRoute,
      {
        path: path,
        element: <CategoryPage />,
      },
      getPostRoute(path),
    ];

    if (item.subMenu) {
      generatePath(item.subMenu, path);
    } else {
      [...oneLevelRoute, getPostRoute(path)];
    }
  });

  return oneLevelRoute;
};
