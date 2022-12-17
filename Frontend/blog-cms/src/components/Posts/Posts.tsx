import React, { useEffect, useMemo, useRef, useState } from "react";
import { BEM } from "../../tools";
import Button from "@mui/material/Button";
import Select from "react-select";
import "./style.css";
import { WithContext as ReactTags } from "react-tag-input";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { CategoryState } from "../../../store/slices/categorySlice";
import SaveButton from "../SaveButton/SaveButton";
import PostsTable from "./PostsTable";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
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