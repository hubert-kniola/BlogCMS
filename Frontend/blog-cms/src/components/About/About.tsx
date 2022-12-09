import React, { useEffect, useState } from "react";
import { BEM } from "../../tools";
import "./style.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { title } from "process";
import { text } from "stream/consumers";
import { FileUploader } from "..";
import { updateAbout } from "../../../store/slices/aboutSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Post } from "../../types";
import { RootState } from "../../../store/store";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface IFormInput {
  title: string;
  text: string;
  file: any;
}

export const About = () => {
  const cssClasses = {
    about: "about",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    textarea: "textarea",
  };
  const dispatch = useAppDispatch();
  const about = useAppSelector((state: RootState) => state.about);
  const { register, setValue, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data["file"] = null;
    dispatch(updateAbout(data));
    notify();
  };

  useEffect(() => {
    const fetchData = () => {
      setValue("title", about.title);
      setValue("text", about.text);
    }

    fetchData();
  });

  const notify = () => {
    toast.success(" Zapisano", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored"
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={BEM(cssClasses.about, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.about,
            cssClasses.container,
            cssClasses.text
          )}
        >
          Uzupełnij informacje o sobie
        </h3>
        <div className={BEM(cssClasses.about, cssClasses.elements)}>
          <p>Tytuł:</p>
          <input
            className={BEM(cssClasses.about, cssClasses.title)}
            type="text"
            {...register("title", { required: true })}
          />
          <p>Treść:</p>
          <textarea
            className={BEM(cssClasses.about, cssClasses.textarea)}
            {...register("text", { required: true })}
          />
          <p>Zdjęcie:</p>
          <FileUploader />
        </div>
        <input className="submitButton" value="Zapisz" type="submit" />
      </div>
      <ToastContainer toastStyle={{ backgroundColor: "#00eadc" }}/>
    </form>
  );
};
