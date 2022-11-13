import React from "react"
import { Faq } from "../../types"
import  "./style.css"

interface IFaqItem  {
    setActiveFaq: () => void
    isActive: boolean
    faq: Faq
}

export const AcordeonItem = ({setActiveFaq, isActive, faq} : IFaqItem) => {
    return (
      <>
        <div className="faq_item">
          <div className="faq_item--tilte">
            <div className="faq_item--question">
              {faq.question.endsWith("?") ? faq.question : faq.question + "?"}
            </div>
            <div className="faq_item--mark" onClick={() => setActiveFaq()}>
              {isActive ? "-" : "+"}
            </div>
          </div>
          <div
            className={`${
              isActive
                ? "faq_item--content faq_item--active"
                : "faq_item--content"
            }`}
          >
            {faq.answer}
          </div>
        </div>
      </>
    );
}