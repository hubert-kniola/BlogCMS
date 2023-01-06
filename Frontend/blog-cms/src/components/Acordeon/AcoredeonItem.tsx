import React from "react";
import { BEM } from "../../tools";
import { FaqType } from "../../types";
import "./style.css";

interface IFaqItem {
  setActiveFaq: () => void;
  isActive: boolean;
  faq: FaqType;
}

const css = {
  faq: "faqMain",
  item: "item",
  title: "tilte",
  question: "question",
  mark: "mark",
  content: "content",
  active: "active",
};

export const AcordeonItem = ({ setActiveFaq, isActive, faq }: IFaqItem) => {
  return (
    <>
      <div className={BEM(css.faq, css.item)} onClick={() => setActiveFaq()}>
        <div className={BEM(css.faq, css.item, css.title)}>
          <div className={BEM(css.faq, css.item, css.question)}>
            {faq.question.endsWith("?") ? faq.question : faq.question + "?"}
          </div>
          <div
            className={BEM(css.faq, css.item, css.mark)}
            onClick={() => setActiveFaq()}>
            {isActive ? "-" : "+"}
          </div>
        </div>
        <div
          className={`${
            isActive
              ? `${BEM(css.faq, css.item, css.content)} ${BEM(
                  css.faq,
                  css.item,
                  css.active
                )}`
              : BEM(css.faq, css.item, css.content)
          }`}>
          {faq.answer}
        </div>
      </div>
    </>
  );
};
