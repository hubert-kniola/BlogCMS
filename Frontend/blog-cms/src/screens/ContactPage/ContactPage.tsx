import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_CONTACT_INFO } from "../../apollo/apolloQueries";
import { Input } from "../../components";
import Spinner from "../../components/Spinner/Spinner";
import { BEM } from "../../tools";
import { ContactInfoType } from "../../types";
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
  const { loading, error, data } = useQuery(GET_CONTACT_INFO);
  const [contactInfo, setContactInfo] = useState(undefined as ContactInfoType);

  const getContactInfoData = (data: any): ContactInfoType => {
    console.log(data?.contactInfo);
    return data?.contactInfo;
  };

  useEffect(() => {
    if (!loading) {
      setContactInfo(getContactInfoData(data));
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Spinner />
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
              <button type="submit">Wyślij!</button>
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
