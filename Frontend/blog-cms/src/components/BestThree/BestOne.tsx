import React from "react";
import { BackgroundDiv } from "..";
import { BlobStorageURL } from "../../settings";
import { BEM, GetDate } from "../../tools";
import { Post } from "../../types";
import "./style.css";

const css = {
  bestContainer: "bestContainer",
  bestContent: "bestContent",
  bestPost: "bestPost",
  bestPhoto: "bestPhoto",
  bestTitle: "bestTitle",
  bestDate: "bestDate",
  bestSnippet: "bestSnippet",
  bestHidden: "bestHidden",
  modifiers: {
    second: "second",
  },
};
interface IBestOne {
  post: Post;
  isSecond?: boolean;
}

export const BestOne = ({ post, isSecond = false }: IBestOne) => {
  return (
    <>
      <div
        className={`${BEM(css.bestContainer, css.bestPost)} ${
          isSecond && BEM(css.bestContainer, css.bestPost, css.modifiers.second)
        }`}>
        <BackgroundDiv
          url={`${BlobStorageURL}${post.primaryImgName}`}
          className={BEM(css.bestPost, css.bestPhoto)}
        />
        <div className={BEM(css.bestPost, css.bestContent)}>
          <div className={BEM(css.bestPost, css.bestTitle)}>{post.title}</div>
          <div className={BEM(css.bestPost, css.bestDate)}>
            {GetDate(post.publicationDate.toString())}
          </div>
          <div className={BEM(css.bestPost, css.bestSnippet)}>
            {post.snippet}
          </div>
          <div className={BEM(css.bestPost, css.bestHidden)}>
            <a
              href={
                post.categories[0]
                  ? post.categories[0].path + "/" + post.id
                  : ""
              }>
              Read More
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
