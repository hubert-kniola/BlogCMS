import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateFooter } from "../../../store/slices/configureSlice";
import { RootState } from "../../../store/store";
import { UPDATE_FOOTER_CONTENT } from "../../apollo/apolloQueries";
import { BEM } from "../../tools";
import { AdminUpdateFooterForm, ContentInput } from "../../types";
import "./style.css";

interface FooterProps {
  onSubmit: () => void;
}

const Footer = ({ onSubmit }: FooterProps) => {
  const dispatch = useAppDispatch();
  const footer = useAppSelector((state: RootState) => state.configure.footer);
  const { register, setValue, handleSubmit } = useForm();
  const [updateFooterMutation] = useMutation(UPDATE_FOOTER_CONTENT);
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
        setValue("text1", footer[0].value);
        setValue("text2", footer[1].value);
        setValue("text3", footer[2].value);
      }
    };

    fetchData();
  }, []);

  const onSubmitFooter: SubmitHandler<any> = async (data) => {
    let newFooter: ContentInput[] = [];
    newFooter.push({
      value: data.text1,
      name: footer[0].name,
      id: footer[0].id,
    });
    newFooter.push({
      value: data.text2,
      name: footer[1].name,
      id: footer[1].id,
    });
    newFooter.push({
      value: data.text3,
      name: footer[2].name,
      id: footer[2].id,
    });
    dispatch(updateFooter(newFooter));
    updateFooterMutation({
      variables: { contentList: newFooter } as AdminUpdateFooterForm,
    });
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
