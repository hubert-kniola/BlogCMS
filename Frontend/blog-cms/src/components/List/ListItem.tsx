import React from "react";
import "./style.css";
import { BEM } from "../../tools";
import { CategoryType, Post } from "../../types";
import { BackgroundDiv } from "..";
import { BlobStorageURL } from "../../settings";

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
};

const GetNextItemClass = () => {
  return (
    GetFirstItemClass() + " " + BEM(css.listItem, null, css.modifiers.next)
  );
};

interface IListItem {
  post: Post;
  index: number;
}

export const ListItem = ({ post, index }: IListItem) => {
  const joinCategories = (categories: CategoryType[]): string => {
    var text: string | undefined = undefined;

    categories.forEach((category) => {
      if (text) {
        text += `, ${category.title}`;
      } else {
        text = category.title;
      }
    });
    return text;
  };

  const htmlToPlainText = (html: string): string => {
    let element = document.createElement("span");
    element.innerHTML = html;
    let plainText = element.textContent;
    return plainText.replace(/<[^>]*>/g, "");
  };

  return (
    <a
      href={`${post.categories[0].path}/${post.id}`}
      className={index > 0 ? GetNextItemClass() : GetFirstItemClass()}>
      <BackgroundDiv
        url={`${BlobStorageURL}${post.primaryImgName}`}
        className={BEM(css.listItem, css.photo)}
      />
      <div className={BEM(css.listItem, css.content)}>
        <div className={BEM(css.listItem, css.title)}>{post.title}</div>
        <div className={BEM(css.listItem, css.date)}>
          {post.publicationDate.toString()}
        </div>
        <div className={BEM(css.listItem, css.snippet)}>
          {htmlToPlainText(post.content)}
        </div>
        <div className={BEM(css.listItem, css.date)}>
          Category:{" "}
          {post.categories &&
            post.categories.map((category) => category.title).join(", ")}
        </div>
        <div className={BEM(css.listItem, css.date)}>
          Time to read: {post.timeToReadInMs ? post.timeToReadInMs : "5 min"}
        </div>
      </div>
    </a>
  );
};
