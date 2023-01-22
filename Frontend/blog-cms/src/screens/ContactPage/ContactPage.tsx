import { useMutation, useQuery } from "@apollo/client";
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

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isNameInvalid, setNameIsInvalid] = useState(false);
  const [isEmailInvalid, setEmailIsInvalid] = useState(false);
  const [isMessageInvalid, setMessageIsInvalid] = useState(false);
  const [isFirstLoop, setIsFirstLoop] = useState(true);

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

  const checkNameValid = () => {
    if (name.trim().length <= 2) {
      setNameIsInvalid(true);
      setIsFirstLoop(false);
    }
  };

  const checkMessageValid = () => {
    if (name.trim().length <= 2) {
      setMessageIsInvalid(true);
      setIsFirstLoop(false);
    }
  };

  const checkEmailValid = () => {
    if (!emailRegex.test(email)) {
      setEmailIsInvalid(true);
      setIsFirstLoop(false);
    }
  };

  //TODO Obsłużyć formularz
  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    checkNameValid();
    checkEmailValid();
    checkMessageValid();

    if (
      !isNameInvalid &&
      !isEmailInvalid &&
      !isMessageInvalid &&
      !isFirstLoop
    ) {
      createContactForm({
        variables: {
          name: name,
          email: email,
          content: message,
        } as ContactForm,
      });

      setName("");
      setEmail("");
      setMessage("");
    }
  };

  useEffect(() => {
    if (!loadingData) {
      //TODO if success wyślij wiadomość, że się dodało :)
      setContactInfo(getContactInfoData(contactInfoData));
    }
  }, [loadingData]);

  useEffect(() => {
    if (isNameInvalid) {
      setNameIsInvalid(false);
    }
  }, [name]);

  useEffect(() => {
    if (isEmailInvalid) {
      setEmailIsInvalid(false);
    }
  }, [email]);

  useEffect(() => {
    if (isMessageInvalid) {
      setMessageIsInvalid(false);
    }
  }, [message]);

  return (
    <>
      {loadingData ? (
        <Spinner color={pageColor} />
      ) : (
        <div className={BEM(css.contact, css.view)}>
          <div className={BEM(css.contact, css.box)}>
            <div className={BEM(css.contact, css.info)}>
              <p id="contactInfoTtitle"> {contactInfo && contactInfo.title}</p>
              <div dangerouslySetInnerHTML={{ __html: contactInfo?.content }} />
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
              <Input
                invalid={isNameInvalid}
                placeholder="Imię"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                onBlur={() => checkNameValid()}
              />
              <h1> E-mail: </h1>
              <Input
                invalid={isEmailInvalid}
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                onBlur={checkEmailValid}
              />
              <h1>Co tam?</h1>
              <textarea
                style={isMessageInvalid ? { borderColor: "red" } : {}}
                required
                placeholder="Co tam? "
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                onBlur={checkMessageValid}
              />
              <button
                type="submit"
                onClick={(e) => onClickHandler(e)}
                disabled={isNameInvalid && isEmailInvalid && isMessageInvalid}>
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
