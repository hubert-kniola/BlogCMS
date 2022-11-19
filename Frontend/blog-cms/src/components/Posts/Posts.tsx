import React, { useEffect, useMemo, useRef, useState } from "react";
import { BEM } from "../../tools";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./style.css";
import FileUploader from "../FileUploader/FileUploader";
import { WithContext as ReactTags } from "react-tag-input";
import MenuItem from "@mui/material/MenuItem";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { FormControl, FormHelperText, OutlinedInput } from "@mui/material";
import { CategoryState } from "../../../store/slices/categorySlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Posts = () => {
  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const [mainCategory, setMainCategory] = useState<CategoryState>({
    title: null,
    url: null,
    subMenu: [],
  });
  const [mainCategoryName, setMainCategoryName] = useState<string>(null);
  const [subCategory, setSubCategory] = useState<string[]>([]);

  const cssClasses = {
    post: "post",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    tag: "tag",
  };

  const exampleCategories: CategoryState[] = [
    {
      title: "Title 1",
      url: "xd",
      subMenu: null,
    },
    {
      title: "Title 2",
      url: "xdd",
      subMenu: [{ title: "SubTitle2.1", url: "", subMenu: null }],
    },
  ];

  const handleMainCategory = (event: SelectChangeEvent<any>) => {
    setMainCategory(event.target.value as CategoryState);
    setMainCategoryName(event.target.value);
  };

  const handleSubCategory = (event: SelectChangeEvent<typeof subCategory>) => {
    const {
      target: { value },
    } = event;
    setSubCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-helper-label"
            id="mainDropDown"
            value={mainCategoryName}
            autoWidth
            displayEmpty
            onChange={handleMainCategory}
            MenuProps={MenuProps}
          >
            <MenuItem value="">Brak</MenuItem>
            {exampleCategories.map((element: CategoryState) => (
              <MenuItem value={element.title}>{element.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <p>Podkategoria:</p>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-multiple-name-label"
            id="subDropDown"
            multiple
            value={subCategory}
            onChange={handleSubCategory}
            displayEmpty
            autoWidth
            MenuProps={MenuProps}
          >
            {mainCategory.subMenu ? (
              mainCategory.subMenu.map((element: any, i: number) => (
                <MenuItem key={i} value={element.title}>
                  {element.title}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Brak</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Posts;
