import React, { ChangeEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tiles } from "..";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addCategory,
  CategoryState,
} from "../../../store/slices/categorySlice";
import { RootState } from "../../../store/store";
import { BEM, ConvertTitleToPath } from "../../tools";
import { mainColor } from "../../types/consts";
import SaveButton from "../SaveButton/SaveButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import "./style.css";
import { ADD_CATEGORY } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import { AdminAddCategoryForm } from "../../types";

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
    path: "",
    subCategory: [],
  });
  const categoriesRedux = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const postsId = useAppSelector(
    (state: RootState) => state.category.postsId
  );
  const [addCategoryMutation, { data, loading, error }] =
    useMutation(ADD_CATEGORY);
  const dispatch = useAppDispatch();

  const addReduxCategory = () => {
    setCategories([...categories, enteredCategory]);
    const existedCategories = categoriesRedux.findIndex(
      (element: CategoryState) => element.title === enteredCategory.title
    );
    if (enteredCategory && existedCategories === -1) {
      dispatch(addCategory(enteredCategory));
      addCategoryMutation({
        variables: {
          title: enteredCategory.title,
          path: ConvertTitleToPath(enteredCategory.title),
          parentId: postsId,
        } as AdminAddCategoryForm,
      });
    }
    setEnteredCategory({
      title: "",
      path: "",
      subCategory: [],
    });
  };

  useEffect(() => {
    const fetchData = () => {
      //TODO - implement load from redux after login fetch
      //dispatch(updateMenu());
    };

    fetchData();
  });

  const saveCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredCategory({
      title: e.currentTarget.value,
      path: `/${e.currentTarget.value}/`,
      subCategory: [],
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
            <IconButton onClick={addReduxCategory}>
              <AddBoxIcon fontSize="large" sx={{ color: mainColor }} />
            </IconButton>
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
      <ToastContainer toastStyle={{ backgroundColor: mainColor }} />
    </div>
  );
};
