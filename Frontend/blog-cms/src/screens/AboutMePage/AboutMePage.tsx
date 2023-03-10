import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ABOUT } from "../../apollo/apolloQueries";
import { BackgroundDiv } from "../../components";
import Spinner from "../../components/Spinner/Spinner";
import { BlobStorageURL } from "../../settings";
import { BEM } from "../../tools";
import { AboutPageType } from "../../types";
import { pageColor } from "../../types/consts";
import "./style.css";

const css = {
  aboutMe: "aboutMe",
  photo: "photo",
  content: "content",
};

export const AboutMePage = () => {
  const { loading, error, data } = useQuery(GET_ABOUT);
  const [aboutData, setAboutData] = useState(undefined as AboutPageType);

  const getAboutData = (data: any): AboutPageType => {
    return data?.about[0];
  };

  useEffect(() => {
    if (!loading) {
      setAboutData(getAboutData(data));
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Spinner color={pageColor} />
      ) : (
        <div className={BEM(css.aboutMe)}>
          <BackgroundDiv
            url={aboutData && `${BlobStorageURL}${aboutData.imgName}`}
            className={BEM(css.aboutMe, css.photo)}
          />
          <div className={BEM(css.aboutMe, css.content)}>
            <p dangerouslySetInnerHTML={{ __html: aboutData?.title }} />
            <div dangerouslySetInnerHTML={{ __html: aboutData?.text }} />
          </div>
        </div>
      )}
    </>
  );
};
