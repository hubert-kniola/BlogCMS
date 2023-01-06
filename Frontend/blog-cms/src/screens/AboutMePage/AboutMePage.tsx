import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ABOUT } from "../../apollo/apolloQueries";
import { BackgroundDiv } from "../../components";
import Spinner from "../../components/Spinner/Spinner";
import { BlobStarageURL } from "../../settings";
import { BEM } from "../../tools";
import { AboutPageType } from "../../types";
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
        <Spinner />
      ) : (
        <div className={BEM(css.aboutMe)}>
          <BackgroundDiv
            url={aboutData && `${BlobStarageURL}${aboutData.imgName}`}
            className={BEM(css.aboutMe, css.photo)}
          />
          <div className={BEM(css.aboutMe, css.content)}>
            <p>{aboutData && aboutData.title}</p>
            <div>{aboutData && aboutData.text}</div>
          </div>
        </div>
      )}
    </>
  );
};
