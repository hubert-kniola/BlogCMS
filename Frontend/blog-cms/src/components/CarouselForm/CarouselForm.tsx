import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import {
  addCarousel,
  updateCarousel,
} from "../../../store/slices/configureSlice";
import { RootState } from "../../../store/store";
import { BEM, GetGTMDate } from "../../tools";
import { UploadType } from "../../types";
import { mainColor } from "../../types/consts";
import FileUploader from "../FileUploader/FileUploader";
import SaveButton from "../SaveButton/SaveButton";
import "./style.css";

interface CarouselFormProps {
  type: string;
  handleClose: () => void;
  index: number;
}

const CarouselForm = ({ type, handleClose, index }: CarouselFormProps) => {
  const dispatch = useDispatch();
  const carousels = useAppSelector(
    (state: RootState) => state.configure.carousel
  );
  const [richValue, setRichValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [activeSlide, setActiveSlide] = useState<boolean>(false);

  useEffect(() => {
    const initEditedPost = () => {
      if (type === "edit") {
        if (carousels[index]) {
          let carousel = carousels[index];
          setTitle(carousel.title);
          setRichValue(carousel.content);
          setActiveSlide(carousel.active);
          setSelectedFile(carousel.file);
        }
      }
    };
    initEditedPost();
  }, []);

  const cssClasses = {
    carousel: "carouselForm",
    container: "container",
    text: "text",
    textarea: "textarea",
    elements: "elements",
    title: "title",
    tag: "tag",
    close: "close",
    padding: "padding",
  };

  const handleRich = (e: any) => {
    setRichValue(e.target.value);
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleActiveSlide = (e: any) => {
    setActiveSlide(!activeSlide);
  };

  const handleSelectedFile = (e: File) => {
    setSelectedFile(e);
  };

  const savePost = () => {
    const current = new Date();
    const payload: any = {
      title: title,
      date: GetGTMDate(),
      content: richValue,
      file: selectedFile,
      active: activeSlide,
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
      <CloseIcon sx={{ color: mainColor }} />
    </IconButton>
  );

  return (
    <div className={BEM(cssClasses.carousel, cssClasses.container)}>
      <div className={BEM(cssClasses.carousel, cssClasses.close)}>
        {closeIcon}
      </div>
      <h3
        className={BEM(
          cssClasses.carousel,
          cssClasses.container,
          cssClasses.text
        )}
      >
        {type === "add" ? "Utwórz slajd" : "Edytuj slajd"}
      </h3>
      <div
        className={BEM(
          cssClasses.carousel,
          cssClasses.elements,
          cssClasses.padding
        )}
      >
        <div className={BEM(cssClasses.carousel, cssClasses.elements)}>
          <p>Tytuł:</p>
          <input
            className={BEM(cssClasses.carousel, cssClasses.title)}
            type="text"
            value={title}
            onChange={handleTitle}
          ></input>
          <p>Treść:</p>
          <textarea
            className={BEM(cssClasses.carousel, cssClasses.textarea)}
            value={richValue}
            onChange={handleRich}
          />
          <p>Zdjęcie główne:</p>
          <FileUploader
            type={UploadType.Single}
            inputFile={selectedFile}
            changeInputFile={handleSelectedFile}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={activeSlide}
                onChange={handleActiveSlide}
                sx={{
                  color: mainColor,
                  "&.Mui-checked": {
                    color: mainColor,
                  },
                }}
              />
            }
            label="Aktywuj slajd"
          />
        </div>
      </div>
      <SaveButton
        handleSave={savePost}
        text={type === "add" ? "Dodaj" : "Edytuj"}
      />
    </div>
  );
};

export default CarouselForm;
