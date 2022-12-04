import React, { useEffect, useMemo, useRef, useState } from "react";
import { BEM } from "../../tools";
import Button from "@mui/material/Button";
import Select from "react-select";
import "./style.css";
import { WithContext as ReactTags } from "react-tag-input";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { CategoryState } from "../../../store/slices/categorySlice";
import PostsTable from "../PostsTable/PostsTable";
import { FileUploader } from "..";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

export const Posts = () => {
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
  };

  return (
    <div className={BEM(cssClasses.post, cssClasses.container)}>
      <PostsTable />
    </div>
  );
};