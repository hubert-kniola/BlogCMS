import React from "react";
import "./style.css";
import { BEM } from "../../tools";
import { Post } from "../../types";

const css = {
    listItem: "listItem",
    photo: "photo",
    content: "content",
    title: "title",
    date: "date",
    snippet: "snippet",
    modifiers: {
      next: "next",
    },
  };

const GetFirstItemClass = () => {
    return BEM(css.listItem);

}

const GetNextItemClass = () => {
    return GetFirstItemClass() + " " + BEM(css.listItem, null, css.modifiers.next);
}

interface IListItem {
  post: Post,
  index: number
}

export const ListItem = ({post, index}: IListItem) =>
{
    return (
      <a
        href="https://google.pl"
        className={index > 0 ? GetNextItemClass() : GetFirstItemClass()}
      >
        <div
          className={BEM(css.listItem, css.photo)}
          style={{ backgroundImage: `url(${post.imgUrl})` }}
        />
        <div className={BEM(css.listItem, css.content)}>
          <div className={BEM(css.listItem, css.title)}>{post.title}</div>
          <div className={BEM(css.listItem, css.date)}>{post.date}</div>
          <div className={BEM(css.listItem, css.snippet)}>{post.content}</div>
        </div>
      </a>
    ); 
}
