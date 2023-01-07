import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  GET_CONTACT_INFO,
  POST_CONTACT_FORM,
} from "../../apollo/apolloQueries";
import { BEM } from "../../tools";
import { ContactInfoType } from "../../types";
import "./style.css";

const css = {
  footer: "mainPageFooter",
  item: "item",
};

export const Footer = () => {
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

  useEffect(() => {
    if (!loadingData) {
      setContactInfo(getContactInfoData(contactInfoData));
    }
  }, [loadingData]);

  return (
    <>
      <div className={BEM(css.footer)}>
        {contactInfo &&
          contactInfo.textBoxes.map((item, idx) => {
            return (
              <div key={idx} className={BEM(css.footer, css.item)}>
                <p>{item.fieldName}</p>
                <p>{item.content}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};
