import React from "react";
import { BEM } from "../../tools";
import "./style.css";

const About = () => {
  const cssClasses = {
    about: "about",
    container: "container",
  };
  return <div className={BEM(cssClasses.about, cssClasses.container)}>xd</div>;
};

export default About;
