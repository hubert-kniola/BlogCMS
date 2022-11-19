import React, { useEffect, useMemo, useRef, useState } from "react";
import { BEM } from "../../tools";
import Button from "@mui/material/Button";
import Select from "react-select";
import "./style.css";
import FileUploader from "../FileUploader/FileUploader";
import { WithContext as ReactTags } from "react-tag-input";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { CategoryState } from "../../../store/slices/categorySlice";

const exampleCategories: CategoryState[] = [
  {
    title: "Title 1",
    url: "xd",
    subMenu: [],
  },
  {
    title: "Title 2",
    url: "xdd",
    subMenu: [{ title: "SubTitle2.1", url: "", subMenu: [] }, { title: "SubTitle2.2", url: "", subMenu: [] }],
  },
];

const Posts = () => {
  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const [mainCategory, setMainCategory] = useState<CategoryState>({
    title: null,
    url: null,
    subMenu: [],
  });
  const [subCategoryNames, setSubCategoryNames] = useState<string[]>([]);

  const cssClasses = {
    post: "post",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    tag: "tag",
  };

  const mapMainCategoriesToOptions = (categories: CategoryState[]): any => {
    const options = categories.map((element) => {
      return {
        value: element,
        label: element.title,
      };
    });
    return options;
  };

  const mapSubCategoriesToOptions = (mainCategory: CategoryState): any => {
    const options = mainCategory.subMenu.map((element) => {
      return { value: element.title, label: element.title };
    });
    return options;
  };

  const handleMainCategory = (event: any) => {
    setMainCategory(event.value);
  };

  const handleSubCategory = (event: any) => {
    console.log(event)
    console.log(Object.values(event))
    console.log(Object.values(event.value))
    setSubCategoryNames(
      Object.keys(event.value)
    );
  };

  return (
    <div className={BEM(cssClasses.post, cssClasses.container)}>
      <h3
        className={BEM(cssClasses.post, cssClasses.container, cssClasses.text)}
      >
        Utwórz post
      </h3>
      <div className={BEM(cssClasses.post, cssClasses.elements)}>
        <p>Tytuł:</p>
        <input
          className={BEM(cssClasses.post, cssClasses.title)}
          type="text"
        ></input>
        <p>Treść:</p>

        <p>Zdjęcie:</p>
        <FileUploader />
        <p>Kategoria główna:</p>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={"Brak"}
          placeholder={"Nie wybrano"}
          name="color"
          options={mapMainCategoriesToOptions(exampleCategories)}
          onChange={handleMainCategory}
        />
        <p>Podkategoria:</p>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={"Brak"}
          placeholder={"Nie wybrano"}
          isMulti
          name="color"
          options={mapSubCategoriesToOptions(mainCategory)}
          onChange={handleSubCategory}
        />
      </div>
    </div>
  );
};

export default Posts;
