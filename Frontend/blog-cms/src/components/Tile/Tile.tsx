import React from "react";
import "./style.css";

interface TileProps {
  text: string;
  /*onClick: () => void;*/
}

const Tile = ({ text }: TileProps) => {
  const cssClasses = {
    tile: "tile",
  };
  return (
    <div className={cssClasses.tile}>
      <p>{text}</p>
    </div>
  );
};

export default Tile;
