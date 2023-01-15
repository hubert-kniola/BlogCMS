import { useMutation } from "@apollo/client";
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
import {
  ADD_CAROUSEL_ELEMENT,
  UPDATE_CAROUSEL_ELEMENT,
} from "../../apollo/apolloQueries";
import { AddImageToAzure, BEM, GetGTMDate } from "../../tools";
import {
  AdminAddCarouselForm,
  AdminUpdateCarouselForm,
  UploadType,
} from "../../types";
import { mainColor } from "../../types/consts";
import FileUploader from "../FileUploader/FileUploader";
import SaveButton from "../SaveButton/SaveButton";
import "./style.css";
import { ActionType } from "../../types";

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
  const [fileName, setFileName] = useState<string>("");
  const [disableOnClick, setDisableOnClick] = useState<boolean>(false);
  const [addCarouselMutation, { data, loading, error }] =
    useMutation(ADD_CAROUSEL_ELEMENT);
  const [updateCarouselMutation] = useMutation(UPDATE_CAROUSEL_ELEMENT);

  useEffect(() => {
    const initEditedPost = () => {
      if (type === ActionType.Edit) {
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
    const handleAddActionRedux = () => {
      if (type === ActionType.Add && data) {
        const payload: any = {
          id: data.addCarouselElement.id,
          title: title,
          publicationDate: GetGTMDate(),
          content: richValue,
          imgName: fileName,
          file: selectedFile,
          active: activeSlide,
          url: carousels[index].url,
        };
        dispatch(addCarousel(payload));
        handleClose();
      }
    };
    handleAddActionRedux();
  }, [data]);

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
    header: "header",
    content: "content",
    footer: "footer",
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

  const savePost = async () => {
    if(selectedFile)
    {
      const fileName: any = await AddImageToAzure([selectedFile]);
      setFileName(fileName[0].newName);
    }
    if (type === ActionType.Add) {
      await addCarouselMutation({
        variables: {
          title: title,
          content: richValue,
          publicationDate: GetGTMDate(),
          imgName: fileName,
          active: activeSlide,
          url: "http://localhost:8080/",
        } as AdminAddCarouselForm,
      });
      setDisableOnClick(true);
    } else {
      const payload: any = {
        id: carousels[index].id,
        title: title,
        publicationDate: GetGTMDate(),
        content: richValue,
        imgName: fileName,
        file: selectedFile,
        active: activeSlide,
        url: carousels[index].url,
      };
      await updateCarouselMutation({
        variables: payload as AdminUpdateCarouselForm,
      });
      dispatch(updateCarousel({ carousel: payload, index: index }));
      setDisableOnClick(true);
      handleClose();
    }
  };

  const closeIcon = (
    <IconButton onClick={handleClose}>
      <CloseIcon sx={{ color: mainColor }} />
    </IconButton>
  );

  return (
    <div className={BEM(cssClasses.carousel, cssClasses.container)}>
      <div className={BEM(cssClasses.carousel, cssClasses.header)}>
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
          {type === ActionType.Add ? "Utwórz slajd" : "Edytuj slajd"}
        </h3>
      </div>
      <div className={BEM(cssClasses.carousel, cssClasses.content)}>
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
      <div className={BEM(cssClasses.carousel, cssClasses.footer)}>
        <SaveButton
          handleSave={savePost}
          text={type === ActionType.Add ? "Dodaj" : "Edytuj"}
          disable={disableOnClick}
        />
      </div>
    </div>
  );
};

export default CarouselForm;
