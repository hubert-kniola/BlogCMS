import React from "react";
import { Outlet } from "react-router-dom";
import "./style.css";

export const AdminContent = () => {
  const cssClasses = {
    /* content class */
    content: "content",
    /* tileContainer class */
    tileContainer: "tileContainer",
  };

  return (
    <div className={cssClasses.content}>
      <Outlet/>
    </div>
  );
};
