import { CategoryState } from "../../store/slices/categorySlice";
import { TextPosition } from "./enums";

export type Post = {
    title: string,
    date: string,
    content: string,
    snippet: string;
    imgUrl: string,
    category?: CategoryState[],
    timeToRead?: string,
}

export type Carousel = {
    title: string;
    content: string;
    imgUrl: string;
}

export type PostItemType = {
    post: Post
    index: number;
}

export type MenuItemType = {
    title: string;
    url: string
    subMenu?: MenuItemType[]
}

export type SlideType = {
    photoUrl: string,
    title?: string,
    content?: string,
    textPosition?: TextPosition 
    urlToPost?: string,
} 

export type Faq = {
    question: string,
    answer: string,

}


