import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import {
    addFaq,
    updateFaq
} from "../../../store/slices/configureSlice";
import { RootState } from "../../../store/store";
import { BEM, GetGTMDate } from "../../tools";
import SaveButton from "../SaveButton/SaveButton";
import "./style.css";

interface FaqFormProps {
  type: string;
  handleClose: () => void;
  index: number;
}

const FaqForm = ({ type, handleClose, index }: FaqFormProps) => {
  const dispatch = useDispatch();
  const faqs = useAppSelector(
    (state: RootState) => state.configure.faq
  );
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    const initEditedPost = () => {
      if (type === "edit") {
        if (faqs[index]) {
          let faq = faqs[index];
          setQuestion(faq.question);
          setAnswer(faq.answer);
        }
      }
    };
    initEditedPost();
  }, []);

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

  const savePost = () => {
    const payload: any = {
      question: question,
      answer: answer,
      date: GetGTMDate(),
    };
    if (type === "add") {
      dispatch(addFaq(payload));
    } else {
      dispatch(updateFaq({ faq: payload, index: index }));
    }
    handleClose();
  };

  const closeIcon = (
    <IconButton onClick={handleClose}>
      <CloseIcon sx={{ color: "#00eadc" }} />
    </IconButton>
  );

  return (
    <div className={BEM(cssClasses.post, cssClasses.container)}>
      <div className={BEM(cssClasses.post, cssClasses.close)}>{closeIcon}</div>
      <h3
        className={BEM(cssClasses.post, cssClasses.container, cssClasses.text)}
      >
        {type === "add" ? "Utwórz FAQ" : "Edytuj FAQ"}
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
        text={type === "add" ? "Dodaj" : "Edytuj"}
      />
    </div>
  );
};

export default FaqForm;
