import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import { BEM } from "../../tools";
import "./style.css";

const PostsTable = () => {
  const cssClasses = {
    postTable: "postTable",
    container: "container",
    dropdown: "dropdown",
    item: "item",
    add: "add",
    edit: "edit",
    label: "label",
    date: "date",
  };

  return (
    <div className={BEM(cssClasses.postTable, cssClasses.container)}></div>
  );
};

export default PostsTable;
