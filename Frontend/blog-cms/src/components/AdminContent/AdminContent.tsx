import React from "react";
import { Outlet } from "react-router-dom";
import Tile from "../Tile/Tiles";
import "./style.css";

interface AdminContentProps {
  tiles: any;
}

export const AdminContent = ({ tiles }: AdminContentProps) => {
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
