import React, { useState } from "react";
import { BEM } from "../../tools";
import "./style.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { title } from "process";
import { text } from "stream/consumers";
import { FileUploader } from "..";

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
  };
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  const [richValue, setRichValue] = useState(null);

  const handleRich = (e: any) => {
    setRichValue(e);
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
            {...(register("title"), { required: true })}
          />
          <p>Treść:</p>
          <textarea
            className="post_textarea"
            {...register("text", {}), { required: true }}
          />
          <p>Zdjęcie:</p>
          <FileUploader />
        </div>
        <input className="submitButton" value="Zapisz" type="submit"/>
      </div>
    </form>
  );
};
