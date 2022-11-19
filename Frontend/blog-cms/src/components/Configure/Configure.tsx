import React from "react";
import { BEM } from "../../tools";
import "./style.css";

const Configure = () => {
  const cssClasses = {
    configure: "configure",
    container: "container",
    title: "title",
  };
  return (
    <div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Suwak tytułowy
        </h3>
      </div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Trzy najpopularniejsze posty
        </h3>
      </div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Najnowsze posty
        </h3>
      </div>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Stopka
        </h3>
      </div>
    </div>
  );
};

export default Configure;
