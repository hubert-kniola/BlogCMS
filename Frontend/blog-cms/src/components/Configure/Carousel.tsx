import React, { useEffect, useState } from "react";
import { BEM } from "../../tools";
import "./style.css";
import Select, { GroupBase } from "react-select";
import FileUploader from "../FileUploader/FileUploader";
import { Post } from "../../types";
import { lorem, url1, url2 } from "../BestThree/BestThree";
import SaveButton from "../SaveButton/SaveButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import {
  updateCarousel,
  updateTop3,
  updateFooter,
  ConfigureState,
} from "../../../store/slices/configureSlice";
import { useForm, SubmitHandler } from "react-hook-form";

interface CarouselProps {
  onSubmit: () => void;
}

const CarouselConfigure = ({ onSubmit }: CarouselProps) => {
  const dispatch = useAppDispatch();
  const carousel = useAppSelector(
    (state: RootState) => state.configure.carousel
  );
  const { register, setValue, handleSubmit } = useForm();
  const cssClasses = {
    configure: "configure",
    container: "container",
    title: "title",
    description: "description",
    textarea: "textarea",
  };

  useEffect(() => {
    const fetchData = () => {
      if (carousel) {
        setValue("title", carousel.title);
        setValue("text", carousel.text);
      }
    };

    fetchData();
  }, []);

  const onSubmitCarousel: SubmitHandler<any> = async (data) => {
    data["file"] = null;
    dispatch(updateCarousel(data));
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitCarousel)}>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Karuzela zdjęć
        </h3>
        <p
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.description
          )}
        >
          Sekcja wyświetlająca zmieniające się zdjęcia wraz z wprowadzonym
          tekstem
        </p>
        <div className={BEM(cssClasses.title, cssClasses.container)}>
          <p>Tytuł:</p>
          <input
            className={BEM(cssClasses.title, cssClasses.title)}
            type="text"
            {...register("title")}
          ></input>
          <p>Treść:</p>
          <textarea
            className={BEM(cssClasses.title, cssClasses.textarea)}
            {...register("text")}
          />
          <p>Zdjęcie:</p>
          <FileUploader />
        </div>
        <input className="submitButton" value="Zapisz" type="submit" />
      </div>
    </form>
  );
};

export default CarouselConfigure;
