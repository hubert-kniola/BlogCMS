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

interface ContactFormProps {
  type: string;
  handleClose: () => void;
  index: number;
}

const ContactForm = ({ type, handleClose, index }: ContactFormProps) => {
  const dispatch = useDispatch();
  const messages = useAppSelector((state: RootState) => state.configure.faq);

  const cssClasses = {
    post: "contactForm",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    tag: "tag",
    close: "close",
  };

  const closeIcon = (
    <IconButton onClick={handleClose}>
      <CloseIcon sx={{ color: mainColor }} />
    </IconButton>
  );

  return (
    <div className={BEM(cssClasses.post, cssClasses.container)}>
      <div className={BEM(cssClasses.post, cssClasses.close)}>{closeIcon}</div>
      <h3
        className={BEM(cssClasses.post, cssClasses.container, cssClasses.text)}
      >
        `Wiadomość ${index}`
      </h3>
      <div className={BEM(cssClasses.post, cssClasses.elements)}>
        <p>Pytanie:</p>
      </div>
    </div>
  );
};

export default ContactForm;
