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

interface FaqFormProps {
  type: string;
  handleClose: () => void;
  index: number;
}

const FaqForm = ({ type, handleClose, index }: FaqFormProps) => {
  const dispatch = useDispatch();
  const faqs = useAppSelector((state: RootState) => state.configure.faq);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [addFaqMutation, { data, loading, error }] =
    useMutation(ADD_FAQ_ELEMENT);
  const [updateFaqMutation] = useMutation(UPDATE_FAQ_ELEMENT);
  const [disableOnClick, setDisableOnClick] = useState<boolean>(false);

  useEffect(() => {
    const initEditedPost = () => {
      if (type === ActionType.Edit) {
        if (faqs[index]) {
          let faq = faqs[index];
          setQuestion(faq.question);
          setAnswer(faq.answer);
        }
      }
    };
    initEditedPost();
    const handleAddActionRedux = () => {
      if (type === ActionType.Add && data) {
        const payload: any = {
          id: data.createFaq.id,
          question: question,
          answer: answer,
          modifiedOn: GetGTMDate(),
        };
        dispatch(addFaq(payload));
        handleClose();
      }
    };
    handleAddActionRedux();
  }, [data]);

  const cssClasses = {
    post: "faqForm",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    tag: "tag",
    close: "close",
  };

  const handleQuestion = (e: any) => {
    setQuestion(e.target.value);
  };

  const handleAnswer = (e: any) => {
    setAnswer(e.target.value);
  };

  const savePost = async () => {
    if (type === ActionType.Add) {
      await addFaqMutation({
        variables: {
          question: question,
          answer: answer,
        } as AdminAddFaqForm,
      });
      setDisableOnClick(true);
    } else {
      const payload: any = {
        id: faqs[index].id,
        question: question,
        answer: answer,
      };
      await updateFaqMutation({
        variables: payload as AdminUpdateFaqForm,
      });
      setDisableOnClick(true);
      dispatch(
        updateFaq({
          faq: { ...payload, modifiedOn: GetGTMDate() },
          index: index,
        })
      );
      handleClose();
    }
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
        {type === ActionType.Add ? "Utwórz FAQ" : "Edytuj FAQ"}
      </h3>
      <div className={BEM(cssClasses.post, cssClasses.elements)}>
        <p>Pytanie:</p>
        <textarea
          className={BEM(cssClasses.post, cssClasses.title)}
          value={question}
          onChange={handleQuestion}
        />
        <p>Odpowiedź:</p>
        <textarea
          className={BEM(cssClasses.post, cssClasses.title)}
          value={answer}
          onChange={handleAnswer}
        />
      </div>
      <SaveButton
        handleSave={savePost}
        text={type === ActionType.Add ? "Dodaj" : "Edytuj"}
        disable={disableOnClick}
      />
    </div>
  );
};

export default FaqForm;
