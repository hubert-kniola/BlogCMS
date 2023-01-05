import { CategoryState } from "../../store/slices/categorySlice";
import { RouteObjectType, TextPosition } from "./enums";

export type Post = {
  title: string;
  date: string;
  content: any;
  snippet: string;
  imgUrl: string;
  category?: CategoryState[];
  timeToRead?: string;
};

export type Carousel = {
  title: string;
  content: string;
  date: string;
  imgUrl: string;
  file: File;
  active: boolean;
};

export type FAQ = {
  question: string;
  answer: string;
  date: string;
};

export type PostItemType = {
  post: Post;
  index: number;
};

export type MenuItemType = {
  title: string;
  path: string;
  routeObjectType?: RouteObjectType;
  subMenu?: MenuItemType[];
};

export type SlideType = {
  photoUrl: string;
  title?: string;
  content?: string;
  textPosition?: TextPosition;
  urlToPost?: string;
};

export type Faq = {
  question: string;
  answer: string;
};
