import React, { useState, ChangeEvent, useEffect } from "react";
import { BEM } from "../../tools";
import "./style.css";
import { DndContext } from "@dnd-kit/core";
import { CategoryState, updateMenu } from "../../../store/slices/categorySlice";
import Tiles from "../Tile/Tiles";
import SaveButton from "../SaveButton/SaveButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { addCategory } from "../../../store/slices/categorySlice";

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
  const [categories, setCategories] = useState<CategoryState[]>([]);
  const [enteredCategory, setEnteredCategory] = useState<CategoryState>(null);
  const categoriesRedux = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useAppDispatch();

  const addReduxCategory = () => {
    setCategories([...categories, enteredCategory]);
    const existedCategories = categoriesRedux.findIndex((element: CategoryState) => element.title === enteredCategory.title);
    if(enteredCategory && existedCategories === -1)
    {
      dispatch(addCategory(enteredCategory));
    }
  };

  useEffect(() => {
    const fetchData = () => {
      //dispatch(updateMenu());
    };

    fetchData();
  });

  const saveCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredCategory({
      title: e.currentTarget.value,
      url: `/${e.currentTarget.value}/`,
      subMenu: [],
    });
  };

  const saveMenu = () => {};

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
              onClick={addReduxCategory}
            ></input>
          </div>
          <div
            className={BEM(
              cssClasses.category,
              cssClasses.content,
              cssClasses.table
            )}
          >
            {categoriesRedux.map((element: CategoryState, i: number) => {
              return <Tiles key={i} category={element} />;
            })}
          </div>
        </div>
      </div>
      <SaveButton handleSave={saveMenu} />
    </div>
  );
};

export default Category;
