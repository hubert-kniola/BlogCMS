import React, { useEffect, useState } from "react";
import { BEM } from "../../tools";
import "./style.css";
import { FileUploader } from "..";
import SaveButton from "../SaveButton/SaveButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateContact } from "../../../store/slices/contactSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Post } from "../../types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../../store/store";
import { mainColor } from "../../types/consts";

interface IFormInput {
  title: string;
  text: string;
  file: any;
}

interface IFormInput {
  title: string;
  text: string;
  file: any;
}

export const Contact = () => {
  const cssClasses = {
    contact: "contact",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    textarea: "textarea",
  };

  const dispatch = useAppDispatch();
  const about = useAppSelector((state: RootState) => state.contact);
  const { register, setValue, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data["file"] = null;
    dispatch(updateContact(data));
    notify();
  };

  useEffect(() => {
    const fetchData = () => {
      setValue("title", about.title);
      setValue("text", about.text);
    };

    fetchData();
  });

  const notify = () => {
    toast.success(" Zapisano", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={BEM(cssClasses.contact, cssClasses.container)}>
        {" "}
        <h3
          className={BEM(
            cssClasses.contact,
            cssClasses.container,
            cssClasses.text
          )}
        >
          Uzupełnij informacje kontaktowe
        </h3>
        <div className={BEM(cssClasses.contact, cssClasses.elements)}>
          <p>Tytuł:</p>
          <input
            className={BEM(cssClasses.contact, cssClasses.title)}
            type="text"
            {...register("title", { required: true })}
          ></input>
          <p>Treść:</p>
          <textarea
            className={BEM(cssClasses.contact, cssClasses.textarea)}
            {...register("text", { required: true })}
          />
          <p>Zdjęcie:</p>
          <FileUploader />
        </div>
        <input className="submitButton" value="Zapisz" type="submit" />
      </div>
      <ToastContainer toastStyle={{ backgroundColor: mainColor }}/>
    </form>
  );
};