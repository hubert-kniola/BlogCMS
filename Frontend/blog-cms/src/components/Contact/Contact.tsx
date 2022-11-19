import React from "react";
import { BEM } from "../../tools";
import "./style.css";

const Contact = () => {
  const cssClasses = {
    contact: "contact",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
  };
  return (
    <div className={BEM(cssClasses.contact, cssClasses.container)}>
      {" "}
      <h3
        className={BEM(
          cssClasses.contact,
          cssClasses.container,
          cssClasses.text
        )}
      >
        Uzupełnij informacje kontaktowe
      </h3>
      <div className={BEM(cssClasses.contact, cssClasses.elements)}>
        <p>Tytuł:</p>
        <input
          className={BEM(cssClasses.contact, cssClasses.title)}
          type="text"
        ></input>
        <p>Treść:</p>
      </div>
    </div>
  );
};

export default Contact;
