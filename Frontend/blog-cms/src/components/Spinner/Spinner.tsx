import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { BEM } from "../../tools";
import "./style.css";
import { mainColor } from "../../types/consts";

const Spinner = () => {
  const cssClasses = {
    spinner: "spinner",
    container: "container",
    text: "text",
  };

  const [text, setText] = useState("Loading data...");
  const loadTexts = [
    "Loading main configuration...",
    "Loading posts...",
    "Loading images...",
    "Loading meta data...",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setText(loadTexts[i]);
      if (i > 5) i = 0;
    }, 2000);

    return () => {
      clearInterval(interval);
      setText("Finishing...");
    };
  }, []);

  return (
    <div className={BEM(cssClasses.spinner, cssClasses.container)}>
      <div className={BEM(cssClasses.spinner, cssClasses.spinner)}>
        <CircularProgress
          disableShrink
          size={60}
          sx={{
            color: mainColor,
          }}
        />
      </div>
      <div className={BEM(cssClasses.spinner, cssClasses.text)}>
        <p
          className={BEM(
            cssClasses.spinner,
            cssClasses.spinner,
            cssClasses.text
          )}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default Spinner;
