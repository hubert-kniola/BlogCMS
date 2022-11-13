import React from "react";
import { BEM } from "../../tools";
import "./style.css";

const Configure = () => {
  const cssClasses = {
    configure: "configure",
    container: "container",
  };
  return (
    <div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>xd</div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>xd</div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>xd</div>
    </div>
  );
};

export default Configure;
