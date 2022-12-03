import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { CategoryState } from "../../../store/slices/categorySlice";
import { RootState } from "../../../store/store";
import Select from "react-select";
import { BEM } from "../../tools";
import FileUploader from "../FileUploader/FileUploader";
import "./style.css";
import SaveButton from "../SaveButton/SaveButton";

const exampleCategories: CategoryState[] = [
  {
    title: "Title 1",
    url: "xd",
    subMenu: [],
  },
  {
    title: "Title 2",
    url: "xdd",
    subMenu: [
      { title: "SubTitle2.1", url: "", subMenu: [] },
      {
        title: "SubTitle2.2",
        url: "",
        subMenu: [
          { title: "TagTitle3.1", url: "", subMenu: [] },
          { title: "TagTitle3.2", url: "", subMenu: [] },
        ],
      },
    ],
  },
];

const PostForm = () => {
  const categoriesRedux = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const [mainCategory, setMainCategory] = useState<CategoryState>({
    title: null,
    url: null,
    subMenu: [],
  });
  const [subCategory, setSubCategory] = useState<CategoryState>({
    title: null,
    url: null,
    subMenu: [],
  });
  const [tagCategory, setTagCategory] = useState<CategoryState[]>([]);
  const [richValue, setRichValue] = useState("");

  const cssClasses = {
    post: "post",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    tag: "tag",
  };

  const mapCategoriesToOptions = (categories: CategoryState[]): any => {
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
      return { value: element, label: element.title };
    });
    return options;
  };

  const mapTagCategoriesToOptions = (mainCategory: CategoryState): any => {
    const options = mainCategory.subMenu.map((element) => {
      return { value: element, label: element.title };
    });
    return options;
  };

  const handleMainCategory = (event: any) => {
    setMainCategory(event.value);
    setSubCategory({
      title: null,
      url: null,
      subMenu: [],
    });
    setTagCategory([]);
  };

  const handleSubCategory = (event: any) => {
    setSubCategory(event.value);
    setTagCategory([]);
  };

  const handleTagCategory = (event: any) => {
    setTagCategory(event);
  };

  const handleRich = (e: any) => {
    setRichValue(e);
  };

  const savePost = () => {};

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
        <textarea
          className="post_textarea"
          value={richValue}
          onChange={handleRich}
        />
        <p>Zdjęcie:</p>
        <FileUploader />
        <p>Kategoria główna:</p>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              outline: state.menuIsOpen && "1px solid #00eadc",
            }),
          }}
          defaultValue={"Brak"}
          placeholder={"Nie wybrano"}
          noOptionsMessage={() => "Brak"}
          name="color"
          options={mapCategoriesToOptions(categoriesRedux)}
          onChange={handleMainCategory}
        />
        <p>Podkategoria:</p>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              outline: state.menuIsOpen && "1px solid #00eadc",
            }),
          }}
          defaultValue={"Brak"}
          escapeClearsValue={!subCategory.title}
          placeholder={"Nie wybrano"}
          noOptionsMessage={() => "Brak"}
          name="color"
          options={mapSubCategoriesToOptions(mainCategory)}
          onChange={handleSubCategory}
        />
        <p>Tagi:</p>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              outline: state.menuIsOpen && "1px solid #00eadc",
            }),
          }}
          defaultValue={"Brak"}
          isMulti
          escapeClearsValue={!subCategory.title}
          placeholder={"Nie wybrano"}
          noOptionsMessage={() => "Brak"}
          name="color"
          options={mapTagCategoriesToOptions(subCategory)}
          onChange={handleTagCategory}
        />
      </div>
      <SaveButton handleSave={savePost} text="Dodaj"/>
    </div>
  );
};

export default PostForm;
