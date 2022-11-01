import React from "react";
import { BEM } from "../../tools";
import { Post } from "../../types";
import  "./style.css"

const css = {
    bestContainer: "bestContainer",
    bestContent: "bestContent",
    bestPost: "bestPost",
    bestPhoto: "bestPhoto",
    bestTitle: "bestTitle",
    bestDate: "bestDate",
    bestSnippet: "bestSnippet",
    bestHidden: "bestHidden"
}
interface IBestOne {
  post: Post
}

export const BestOne = ({post}: IBestOne) =>{
    return (
        <>
            <div className={BEM(css.bestContainer, css.bestPost)}>
              <div
                className={BEM(css.bestPost, css.bestPhoto)}
                style={{ backgroundImage: `url(${post.imgUrl})` }}
              />
              <div  className={BEM(css.bestPost, css.bestContent)}>
                <div className={BEM(css.bestPost, css.bestTitle)}>{post.title}</div>
                <div className={BEM(css.bestPost, css.bestDate)}>{post.date}</div>
                <div className={BEM(css.bestPost, css.bestSnippet)}>{post.content}</div>
                <div className={BEM(css.bestPost, css.bestHidden)}>
                  <a href="https://google.pl">Read More</a>
                </div>
              </div>
            </div>
        </>
      );
}