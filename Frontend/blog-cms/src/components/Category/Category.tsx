import React, { useState, ChangeEvent } from "react";
import { BEM } from "../../tools";
import "./style.css";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { CategoryState } from "../../../store/slices/categorySlice";

const Category = () => {
  const cssClasses = {
    category: "category",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    add: "add",
    content: "content",
    input: "input",
    table: "table",
    item: "item",
  };
  const [isDropped, setIsDropped] = useState(false);
  const [categories, setCategories] = useState<CategoryState[]>([]);
  const [enteredCategory, setEnteredCategory] = useState<CategoryState>(null);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  const addCategory = () => {
    console.log(enteredCategory);
    setCategories([...categories, enteredCategory]);
  };

  const saveCategory = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setEnteredCategory({
      title: e.currentTarget.value,
      url: null,
      subMenu: null,
    });
  };

  return (
    <div className={BEM(cssClasses.category, cssClasses.container)}>
      <h3
        className={BEM(
          cssClasses.category,
          cssClasses.container,
          cssClasses.text
        )}
      >
        Zaprojektuj menu strony
      </h3>
      <div className={BEM(cssClasses.category, cssClasses.elements)}>
        <div className={BEM(cssClasses.category, cssClasses.content)}>
          <p>Dodaj główną kategorię:</p>
          <div
            className={BEM(
              cssClasses.category,
              cssClasses.content,
              cssClasses.input
            )}
          >
            <input
              className={BEM(cssClasses.category, cssClasses.title)}
              type="text"
              onChange={saveCategory}
            ></input>
            <input
              type="button"
              value="+"
              className={BEM(
                cssClasses.category,
                cssClasses.title,
                cssClasses.add
              )}
              onClick={addCategory}
            ></input>
          </div>
          <div
            className={BEM(
              cssClasses.category,
              cssClasses.content,
              cssClasses.table
            )}
          >
            {categories.map((element: any, i: number) => {
              return (
                <div
                  key={i}
                  className={BEM(
                    cssClasses.category,
                    cssClasses.content,
                    cssClasses.item
                  )}
                >
                  {element.title}
                </div>
              );
            })}
            {/* <DndContext onDragEnd={handleDragEnd}>
              {!isDropped ? draggableMarkup : null}
              <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
            </DndContext> */}
          </div>
        </div>
      </div>
    </div>
  );

  function handleDragEnd(event: any) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
};

export default Category;
