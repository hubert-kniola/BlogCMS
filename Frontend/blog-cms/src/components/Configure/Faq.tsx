import React, { useEffect, useState } from "react";
import { BEM } from "../../tools";
import FaqTable from "../Tables/FaqTable";
import "./style.css";

const Faq = () => {
  const cssClasses = {
    configure: "configure",
    faq: "faq",
    container: "container",
    title: "title",
    description: "description",
  };

  return (
    <div className={BEM(cssClasses.faq, cssClasses.container)}>
      <h3
        className={BEM(
          cssClasses.configure,
          cssClasses.container,
          cssClasses.title
        )}
      >
        FAQ
      </h3>
      <p
        className={BEM(
          cssClasses.configure,
          cssClasses.container,
          cssClasses.description
        )}
      >
        Sekcja wyświetla dodane pytania i odpowiedzi
      </p>
      <FaqTable/>
    </div>
  );
};

export default Faq;
