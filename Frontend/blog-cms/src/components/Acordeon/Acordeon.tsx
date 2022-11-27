import React, { useState } from "react"
import { BEM } from "../../tools";
import { Faq } from "../../types";
import { AcordeonItem } from "./AcoredeonItem";
import  "./style.css"

let faq :Faq[] = [
    {question: "Czy mogę założyć konto", answer: "To jest moja odpowiedź numer 1"},
    {question: "Czy to ma sens?", answer: "Prawdopodobnie nie!"},
    {question: "Podasz lorum?", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
]

const css={
  faq: "faq",
  container: "container",
  section:"section",
  title: "title",
}

export const Acordeon = () => {
    const [activeIdx, setActiveIdx] = useState(-1);

const setAcriveFaq = (idx: number) => {
    setActiveIdx(prevIdx => prevIdx === idx ? -1 : idx)
}

    return (
      <div className={BEM(css.faq, css.container)}>
        <div className={BEM(css.faq, css.section)}>
          {faq.map((item, idx) => (
            <AcordeonItem
              setActiveFaq={() => setAcriveFaq(idx)}
              isActive={idx === activeIdx}
              faq={item}
            />
          ))}
        </div>
        <div className={BEM(css.faq, css.title)}>
          <div>Najczęściej zadawane pytania!</div>
        </div>
      </div>
    );
}

