import React from "react";
import { BEM } from "../../tools";
import "./style.css";

const Category = () => {
  const cssClasses = {
    category: "category",
    container: "container",
  };
  return <div className={BEM(cssClasses.category, cssClasses.container)}>xd</div>;
};

export default Category;