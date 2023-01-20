import { useMutation } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import { addFaq, updateFaq } from "../../../store/slices/configureSlice";
import { RootState } from "../../../store/store";
import {
  ADD_FAQ_ELEMENT,
  REMOVE_FAQ_ELEMENT,
  UPDATE_FAQ_ELEMENT,
} from "../../apollo/apolloQueries";
import { BEM, GetGTMDate } from "../../tools";
import { AdminAddFaqForm, AdminUpdateFaqForm } from "../../types";
import { mainColor } from "../../types/consts";
import SaveButton from "../SaveButton/SaveButton";
import "./style.css";
import { ActionType } from "../../types";
import Box from "@mui/material/Box";

interface ContactFormProps {
  type: string;
  handleClose: () => void;
  index: number;
}

const ContactForm = ({ type, handleClose, index }: ContactFormProps) => {
  const dispatch = useDispatch();
  const contactForms = useAppSelector(
    (state: RootState) => state.contact.forms
  );

  const cssClasses = {
    contactForm: "contactForm",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    tag: "tag",
    close: "close",
    row: "row",
  };

  const closeIcon = (
    <IconButton onClick={handleClose}>
      <CloseIcon sx={{ color: mainColor }} />
    </IconButton>
  );

  return (
    <div className={BEM(cssClasses.contactForm, cssClasses.container)}>
      <div className={BEM(cssClasses.contactForm, cssClasses.close)}>
        {closeIcon}
      </div>
      <h3
        className={BEM(
          cssClasses.contactForm,
          cssClasses.container,
          cssClasses.text
        )}
      >
        {`Wiadomość od ${contactForms[index].name}`}
      </h3>
      <div className={BEM(cssClasses.contactForm, cssClasses.elements)}>
        <div style={{ width: "100%" }}>
          <div className={BEM(cssClasses.contactForm, cssClasses.row)}>
            <h3>Email: </h3>
            <p>{contactForms[index].email}</p>
          </div>
          <div className={BEM(cssClasses.contactForm, cssClasses.row)}>
            <h3>Treść: </h3>
            <p>
              {contactForms[index].content
                ? contactForms[index].content
                : "<Brak>"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
