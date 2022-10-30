import React from "react";
import Tile from "../../components/Tile/Tile";
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
      <div className={cssClasses.tileContainer}>
        {tiles.map((e: any) => {
          return <Tile text={e.text} />;
        })}
      </div>
    </div>
  );
};
