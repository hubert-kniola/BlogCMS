import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./style.css";

const Droppable = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div className="droppable" ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default Droppable;
