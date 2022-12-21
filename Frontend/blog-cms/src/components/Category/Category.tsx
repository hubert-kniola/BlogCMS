import React, { ChangeEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tiles } from "..";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addCategory, CategoryState } from "../../../store/slices/categorySlice";
import { RootState } from "../../../store/store";
import { BEM } from "../../tools";
import { mainColor } from "../../types/consts";
import SaveButton from "../SaveButton/SaveButton";
import "./style.css";

export const Category = () => {
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
  const [enteredCategory, setEnteredCategory] = useState<CategoryState>({
    title: "",
    url: "",
    subMenu: [],
  });
  const categoriesRedux = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useAppDispatch();

  const addReduxCategory = () => {
    setCategories([...categories, enteredCategory]);
    const existedCategories = categoriesRedux.findIndex(
      (element: CategoryState) => element.title === enteredCategory.title
    );
    if (enteredCategory && existedCategories === -1) {
      dispatch(addCategory(enteredCategory));
    }
    setEnteredCategory({
      title: "",
      url: "",
      subMenu: [],
    });
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

  const notify = () => {
    toast.success(" Zapisano", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
    });
  };

  const saveMenu = () => {
    notify();
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
              value={enteredCategory.title}
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
      <ToastContainer toastStyle={{ backgroundColor: mainColor }}/>
    </div>
  );
};
