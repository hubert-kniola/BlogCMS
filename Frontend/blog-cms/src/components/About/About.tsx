import React from "react";
import { BEM } from "../../tools";
import "./style.css";

const About = () => {
  const cssClasses = {
    about: "about",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title"
  };
  return (
    <div className={BEM(cssClasses.about, cssClasses.container)}>
      <h3
        className={BEM(cssClasses.about, cssClasses.container, cssClasses.text)}
      >
        Uzupełnij informacje o sobie
      </h3>
      <div className={BEM(cssClasses.about, cssClasses.elements)}>
        <p>Tytuł:</p>
        <input
          className={BEM(cssClasses.about, cssClasses.title)}
          type="text"
        ></input>
        <p>Treść:</p>
      </div>
    </div>
  );
};

export default About;
