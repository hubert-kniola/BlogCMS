import React from "react";
import "./Tile.scss";

interface TileProps {
  text: string;
  onClick: () => void;
}

const Tile = ({ text, onClick }: TileProps) => {
  return (
    <div className="tile" onClick={onClick}>
      {text}
    </div>
  );
};

export default Tile;
