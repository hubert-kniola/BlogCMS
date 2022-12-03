import React, { useState } from "react";
import { BEM } from "../../tools";
import "./style.css";
import { FileUploader, SaveButton } from "..";

export const Contact = () => {
  const cssClasses = {
    contact: "contact",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
  };

  const [richValue, setRichValue] = useState(null);

  const handleRich = (e: any) => {
    setRichValue(e);
  };

  const saveAbout = () => {};

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
        <textarea
          className="post_textarea"
          value={richValue}
          onChange={handleRich}
        />
        <p>Zdjęcie:</p>
        <FileUploader />
      </div>
      <SaveButton handleSave={saveAbout} />
    </div>
  );
};