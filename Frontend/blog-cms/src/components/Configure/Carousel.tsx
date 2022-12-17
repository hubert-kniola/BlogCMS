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
import CarouselTable from "./CarouselTable";

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
    carousel: "carousel",
    container: "container",
    title: "title",
    description: "description",
    textarea: "textarea",
  };

  // useEffect(() => {
  //   const fetchData = () => {
  //     if (carousel) {
  //       setValue("title", carousel.title);
  //       setValue("text", carousel.text);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const onSubmitCarousel: SubmitHandler<any> = async (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmitCarousel)}>
      <div className={BEM(cssClasses.carousel, cssClasses.container)}>
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
        <CarouselTable />
      </div>
    </form>
  );
};

export default CarouselConfigure;
