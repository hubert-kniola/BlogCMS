import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { CategoryState } from "../../../store/slices/categorySlice";
import { RootState } from "../../../store/store";
import Select from "react-select";
import { BEM } from "../../tools";
import FileUploader from "../FileUploader/FileUploader";
import "./style.css";
import SaveButton from "../SaveButton/SaveButton";
import { useDispatch } from "react-redux";
import {
  addCarousel,
  updateCarousel,
} from "../../../store/slices/configureSlice";
import { Carousel } from "../../types";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

interface CarouselFormProps {
  type: string;
  handleClose: () => void;
  index: number;
}

const CarouselForm = ({ type, handleClose, index }: CarouselFormProps) => {
  const dispatch = useDispatch();
  const categoriesRedux = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const carousel = useAppSelector(
    (state: RootState) => state.configure.carousel
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
  const [richValue, setRichValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const initEditedPost = () => {
      if (type === "edit") {
        if (carousel[index]) {
          let editedPost = carousel[index];
          setTitle(editedPost.title);
          setRichValue(editedPost.content);
        }
      }
    };
    initEditedPost();
  }, []);

  const cssClasses = {
    post: "carouselForm",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    tag: "tag",
    close: "close",
  };

  const handleRich = (e: any) => {
    setRichValue(e.target.value);
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const savePost = () => {
    const current = new Date();
    const payload: any = {
      title: title,
      date: `${current.getDate()}-${current.getMonth()}-${current.getFullYear()}`,
      content: richValue,
    };
    if (type === "add") {
      dispatch(addCarousel(payload));
    } else {
      dispatch(updateCarousel({ carousel: payload, index: index }));
    }
    handleClose();
  };

  const closeIcon = (
    <IconButton onClick={handleClose}>
      <CloseIcon sx={{ color: "#00eadc" }} />
    </IconButton>
  );

  return (
    <div className={BEM(cssClasses.post, cssClasses.container)}>
      <div className={BEM(cssClasses.post, cssClasses.close)}>{closeIcon}</div>
      <h3
        className={BEM(cssClasses.post, cssClasses.container, cssClasses.text)}
      >
        {type === "add" ? "Utwórz slajd" : "Edytuj slajd"}
      </h3>
      <div className={BEM(cssClasses.post, cssClasses.elements)}>
        <p>Tytuł:</p>
        <input
          className={BEM(cssClasses.post, cssClasses.title)}
          type="text"
          value={title}
          onChange={handleTitle}
        ></input>
        <p>Treść:</p>
        <textarea
          className={BEM(cssClasses.post, cssClasses.title)}
          value={richValue}
          onChange={handleRich}
        />
        <p>Zdjęcie:</p>
        <FileUploader />
      </div>
      <SaveButton
        handleSave={savePost}
        text={type === "add" ? "Dodaj" : "Edytuj"}
      />
    </div>
  );
};

export default CarouselForm;
