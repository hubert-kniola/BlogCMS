import { MenuItemType } from "./types";

export const AuthURL = "https://generalauthapi.azurewebsites.net";
export const BlobStorageURL =
  "https://cmsblogimagestorage.blob.core.windows.net/cms-blog-images/";
export const GraphQlURL = "https://localhost:7226/api";

export const basicMenu: MenuItemType[] = [
  { title: "About", path: "/aboutme" },
  { title: "Contact", path: "/contact" },
];
