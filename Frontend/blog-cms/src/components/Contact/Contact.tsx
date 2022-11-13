import React from "react";
import { BEM } from "../../tools";
import "./style.css";

const Contact = () => {
  const cssClasses = {
    contact: "contact",
    container: "container",
  };
  return <div className={BEM(cssClasses.contact, cssClasses.container)}>xd</div>;
};

export default Contact;
