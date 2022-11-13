import React, { useEffect, useMemo, useRef, useState } from "react";
import { BEM } from "../../tools";
import Button from "@mui/material/Button";
import "./style.css";
import FileUploader from "../FileUploader/FileUploader";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Posts = () => {
  const [tags, setTags] = React.useState([]);

  const cssClasses = {
    post: "post",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    tag: "tag"
  };

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: any) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: any, currPos: any, newPos: any) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div className={BEM(cssClasses.post, cssClasses.container)}>
      <h3
        className={BEM(cssClasses.post, cssClasses.container, cssClasses.text)}
      >
        Utwórz post
      </h3>
      <div className={BEM(cssClasses.post, cssClasses.elements)}>
        <p>Tytuł:</p>
        <input
          className={BEM(cssClasses.post, cssClasses.title)}
          type="text"
        ></input>
        <p>Treść:</p>

        <p>Zdjęcie:</p>
        <FileUploader />
        <p>Kategoria:</p>
        <div className={BEM("tag", "container")}>
          <ReactTags
            classNames={{ tagInput: "tagInput", remove: "tagInput--remove", tag: "tag", tags: "tags"}}
            maxLength={35}
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            placeholder="Dodaj kategorię dla posta"
            autocomplete
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;
