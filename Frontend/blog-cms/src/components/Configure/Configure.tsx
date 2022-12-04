import React, { useEffect, useState } from "react";
import { BEM } from "../../tools";
import "./style.css";
import Select, { GroupBase } from "react-select";
import { Post } from "../../types";
import { lorem, url1, url2 } from "../BestThree/BestThree";
import { FileUploader } from "..";
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
import Carousel from "./Carousel";
import Top3 from "./Top3";
import Footer from "./Footer";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface IFormTop3Input {
  title: string;
  text: string;
  file?: any;
}

interface IFormFooterInput {
  footer: string[];
}

export const Configure = () => {
  const dispatch = useAppDispatch();
  const cssClasses = {
    configure: "configure",
    container: "container",
    title: "title",
    description: "description",
    textarea: "textarea",
  };

  const positionOptions: any = [
    { value: "top-left", label: "Górny lewy" },
    { value: "top-center", label: "Górny centrum" },
    { value: "top-right", label: "Górny prawy" },
    { value: "center-left", label: "Środkowy lewy" },
    { value: "center-center", label: "Środkowy centrum" },
    { value: "center-right", label: "Środkowy prawy" },
    { value: "bottom-left", label: "Dolny lewy" },
    { value: "bottom-center", label: "Dolny centrum" },
    { value: "bottom-right", label: "Dolny prawy" },
  ];

  const notify = () => {
    toast.success(" Zapisano", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored"
    });
  };

  return (
    <div>
      <Carousel onSubmit={notify}/>
      <Top3 onSubmit={notify}/>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Najnowsze posty
        </h3>
        <p
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.description
          )}
        >
          Sekcja wyświetlająca zbiór najnowszych postów
        </p>
        <div className={BEM(cssClasses.title, cssClasses.container)}>
          <h3
            className={BEM(
              cssClasses.configure,
              cssClasses.container,
              cssClasses.title
            )}
          >
            Posty zostaną dobrane automatycznie według daty dodania
          </h3>
        </div>
      </div>
      <Footer onSubmit={notify}/>
      <ToastContainer/>
    </div>
  );
};

