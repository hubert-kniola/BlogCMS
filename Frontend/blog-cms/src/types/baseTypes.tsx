import { CategoryState } from "../../store/slices/categorySlice";
import { RouteObjectType, TextPosition } from "./enums";

export type Post = {
  id?: string; //TODO: Zmienić na 'id' (BEZ ?)
  title: string;
  publicationDate: Date | string; //TODO: tylko DATE
  content: any;
  snippet: string;
  primaryImgName: string;
  contentImgName?: string[];
  category?: CategoryState[];
  timeToReadInMs?: string;
};

export type Carousel = {
  id: string;
  title: string;
  content: string;
  publicationDate: string;
  imgName: string;
  file: File;
  active: boolean;
  url: string;
};

export type FAQ = {
  question: string;
  answer: string;
  modifiedOn: string;
};

export type PostItemType = {
  post: Post;
  index: number;
};

export type CategoryType = {
  title: string;
  path: string;
  objectType?: RouteObjectType;
  subCategory?: CategoryType[];
};

export type FaqType = {
  question: string;
  answer: string;
};

export type AboutPageType = {
  id: string;
  title: string;
  text: string;
  imgName: string;
};

export type ContactInfoType = {
  id: string;
  title: string;
  content: string;
  textBoxes: TextBoxes[];
};

export type TextBoxes = {
  fieldName: string;
  content: string;
};

export type ContactForm = {
  id: string;
  name: string;
  email: string;
  content: string;
};
