import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_FOOTER_CONTENT } from "../../apollo/apolloQueries";
import { BEM } from "../../tools";
import { ContentInput } from "../../types";
import "./style.css";

const css = {
  footer: "mainPageFooter",
  item: "item",
};

export const Footer = () => {
  const { loading, error, data } = useQuery(GET_FOOTER_CONTENT);

  const [footerContent, setFooterContent] = useState([] as ContentInput[]);

  const getFooterContent = (data: any): ContentInput[] => {
    return data?.footerContent;
  };

  useEffect(() => {
    if (!loading) {
      setFooterContent(getFooterContent(data));
    }
  }, [loading]);

  return (
    <>
      <div className={BEM(css.footer)}>
        {!loading &&
          footerContent.map((item, idx) => {
            return (
              <div key={idx} className={BEM(css.footer, css.item)}>
                <p dangerouslySetInnerHTML={{ __html: item.value }} />
              </div>
            );
          })}
      </div>
    </>
  );
};
