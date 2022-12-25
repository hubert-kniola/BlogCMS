import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BEM } from "../../tools";
import PostsTable from "../Tables/PostsTable";
import "./style.css";

export const Posts = () => {
  const cssClasses = {
    post: "post",
    container: "container",
    configure: "configure",
    title: "title",
    description: "description",
  };

  return (
    <div className={BEM(cssClasses.post, cssClasses.container)}>
      <h3
        className={BEM(
          cssClasses.configure,
          cssClasses.container,
          cssClasses.title
        )}
      >
        Posty
      </h3>
      <p
        className={BEM(
          cssClasses.configure,
          cssClasses.container,
          cssClasses.description
        )}
      >
        Sekcja służąca do zarządzania postami
      </p>
      <PostsTable />
    </div>
  );
};
