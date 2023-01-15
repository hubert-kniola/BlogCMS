import { useMutation, useQuery } from "@apollo/client";
import { emitWarning } from "process";
import React, { useEffect, useState } from "react";
import {
  GET_CONTACT_INFO,
  POST_CONTACT_FORM,
} from "../../apollo/apolloQueries";
import { Input } from "../../components";
import Spinner from "../../components/Spinner/Spinner";
import { BEM } from "../../tools";
import { ContactForm, ContactInfoType } from "../../types";
import { pageColor } from "../../types/consts";
import "./style.css";

const css = {
  contact: "contact",
  view: "view",
  box: "box",
  info: "info",
  form: "form",
  content: "content",
};

type Field = {
  fieldName: string;
  content: string;
};
interface Contact1 {
  title: string;
  text: string;
  fields: Field[];
}

export const ContactPage = () => {
  const {
    loading: loadingData,
    error: errorData,
    data: contactInfoData,
  } = useQuery(GET_CONTACT_INFO);
  const [createContactForm, { data, loading, error }] =
    useMutation(POST_CONTACT_FORM);

  const [contactInfo, setContactInfo] = useState(undefined as ContactInfoType);

  const getContactInfoData = (data: any): ContactInfoType => {
    return data?.contactInfo;
  };

  //TODO Obsłużyć formularz
  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    createContactForm({
      variables: {
        name: "Kolega Darka",
        email: "zna@darka.pl",
        content: "interesuje się jego żoną",
      } as ContactForm,
    });
  };

  useEffect(() => {
    if (!loadingData) {
      //TODO if success wyślij wiadomość, że się dodało :)
      setContactInfo(getContactInfoData(contactInfoData));
    }
  }, [loadingData]);

  return (
    <>
      {loadingData ? (
        <Spinner color={pageColor} />
      ) : (
        <div className={BEM(css.contact, css.view)}>
          <div className={BEM(css.contact, css.box)}>
            <div className={BEM(css.contact, css.info)}>
              <p> {contactInfo && contactInfo.title}</p>
              <div>{contactInfo && contactInfo.content}</div>
              {contactInfo &&
                contactInfo.textBoxes.map((field, idx) => {
                  return (
                    <TextBox
                      key={idx}
                      option={field.fieldName}
                      contact={field.content}
                    />
                  );
                })}
            </div>
            <div className={BEM(css.contact, css.form)}>
              <p>Formularz kontaktowy </p>
              <h1> Imię: </h1>
              <Input placeholder="Imię" />
              <h1> E-mail: </h1>
              <Input placeholder="E-mail" />
              <h1>Co tam?</h1>
              <textarea required placeholder="Co tam? " />
              <button type="submit" onClick={(e) => onClickHandler(e)}>
                Wyślij!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface ITextBox {
  option: string;
  contact: string;
}

const TextBox = ({ option, contact }: ITextBox) => {
  return (
    <div className={BEM(css.contact, css.content)}>
      <h1> {option} </h1>
      <div>{contact}</div>
    </div>
  );
};
