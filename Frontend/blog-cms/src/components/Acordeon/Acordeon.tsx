import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_FAQ } from "../../apollo/apolloQueries";
import { BEM } from "../../tools";
import { FaqType } from "../../types";
import Spinner from "../Spinner/Spinner";
import { AcordeonItem } from "./AcoredeonItem";
import "./style.css";

const css = {
  faq: "faqMain",
  container: "container",
  section: "section",
  title: "title",
};

export const Acordeon = () => {
  const { loading, error, data } = useQuery(GET_FAQ);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [faq, setFaq] = useState(undefined as FaqType[]);

  const setAcriveFaq = (idx: number) => {
    setActiveIdx((prevIdx) => (prevIdx === idx ? -1 : idx));
  };

  const getFaqData = (data: any): FaqType[] => {
    return data?.allFaq;
  };

  useEffect(() => {
    if (!loading) {
      setFaq(getFaqData(data));
    }
  }, [loading, faq]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={BEM(css.faq, css.container)}>
          <div className={BEM(css.faq, css.section)}>
            {faq &&
              faq.map((item, idx) => (
                <AcordeonItem
                  key={idx}
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
      )}
    </>
  );
};
