import { CategoryState } from "../../store/slices/categorySlice";
import { RouteObjectType, TextPosition } from "./enums";

export enum ActionType {
  Add = "add",
  Edit = "edit",
}

export type Post = {
  id?: string; //TODO: Zmienić na 'id' (BEZ ?)
  title: string;
  publicationDate: Date | string; //TODO: tylko DATE
  content: any;
  snippet: string;
  primaryImgName: string;
  contentImgName?: string[];
  categories?: CategoryType[];
  timeToReadInMs?: string;
  primaryFile?: any;
  contentFile?: any[];
};

export type Carousel = {
  id: string;
  title: string;
  content: string;
  publicationDate: string;
  imgName: string;
  file: any;
  active: boolean;
  url: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  modifiedOn: string;
};

export type PostItemType = {
  post: Post;
  index: number;
};

export type CategoryType = {
  id?: string;
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

export type AdminAboutForm = {
  id: string;
  title: string;
  text: string;
  imgName: string;
};

export type AdminContactForm = {
  id: string;
  title: string;
  content: string;
  textBoxes: TextBoxes[];
};

export type AdminInsertPostForm = {
  title: string;
  publicationDate: Date | string; //TODO: tylko DATE
  content: any;
  snippet: string;
  primaryImgName: string;
  contentImgName?: string[];
  categories?: CategoryType[];
  timeToReadInMs?: string;
};

export type AdminUpdatePostForm = {
  id?: string; //TODO: Zmienić na 'id' (BEZ ?)
  title: string;
  publicationDate: Date | string; //TODO: tylko DATE
  content: string;
  snippet: string;
  primaryImgName: string;
  contentImgName?: string[];
  categories?: CategoryType[];
  timeToReadInMs?: string;
};

export type AdminRemovePostForm = {
  id: string;
  title: string;
  content: string;
  textBoxes: TextBoxes[];
};

export type AdminAddCategoryForm = {
  title: string;
  path: string;
  parentId: string;
};

export type AdminUpdateCategoryForm = {
  id: string;
  title: string;
  content: string;
  textBoxes: TextBoxes[];
};

export type AdminRemoveCategoryForm = {
  id: string;
  title: string;
  content: string;
  textBoxes: TextBoxes[];
};

export type AdminAddCarouselForm = {
  title: string;
  content: string;
  publicationDate: string;
  imgName: string;
  active: boolean;
  url: string;
};

export type AdminUpdateCarouselForm = {
  id: string;
  title: string;
  content: string;
  publicationDate: string;
  imgName: string;
  active: boolean;
  url: string;
};

export type AdminRemoveCarouselForm = {
  id: string;
};

export type AdminAddFaqForm = {
  question: string;
  answer: string;
};

export type AdminUpdateFaqForm = {
  id: string;
  question: string;
  answer: string;
};

export type AdminRemoveFaqForm = {
  id: string;
};

export type AdminPopularForm = {
  id: string;
  title: string;
  content: string;
  textBoxes: TextBoxes[];
};

export type AdminUpdateTop3Form = {
  top: string[];
};

export type AdminUpdateNewestForm = {
  content: ContentInput;
};

export type AdminUpdateFooterForm = {
  contentList: ContentInput[];
}

export type ContentInput = {
  id: string;
  name: string;
  value: string;
};

export type AdminRemoveContactForm = {
  id: string;
};
