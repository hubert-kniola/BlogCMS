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

interface FooterProps {
  onSubmit: () => void;
}

const Footer = ({ onSubmit }: FooterProps) => {
  const dispatch = useAppDispatch();
  const footer = useAppSelector((state: RootState) => state.configure.footer);
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
      if (footer) {
        setValue("text1", footer.text1);
        setValue("text2", footer.text2);
        setValue("text3", footer.text3);
      }
    };

    fetchData();
  }, []);

  const onSubmitFooter: SubmitHandler<any> = async (data) => {
    dispatch(updateFooter(data));
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFooter)}>
      <div className={BEM(cssClasses.configure, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Stopka
        </h3>
        <p
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.description
          )}
        >
          Sekcja wyświetlająca stopkę strony
        </p>
        <div className={BEM(cssClasses.title, cssClasses.container)}>
          <p>Tekst 1:</p>
          <input
            className={BEM(cssClasses.title, cssClasses.title)}
            type="text"
            {...register("text1")}
          />
          <p>Tekst 2:</p>
          <input
            className={BEM(cssClasses.title, cssClasses.title)}
            type="text"
            {...register("text2")}
          />
          <p>Tekst 3:</p>
          <input
            className={BEM(cssClasses.title, cssClasses.title)}
            type="text"
            {...register("text3")}
          />
        </div>
        <input className="submitButton" value="Zapisz" type="submit" />
      </div>
    </form>
  );
};

export default Footer;
