import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ABOUT } from "../../apollo/apolloQueries";
import { BackgroundDiv } from "../../components";
import Spinner from "../../components/Spinner/Spinner";
import { BlobStarageURL } from "../../settings";
import { BEM } from "../../tools";
import { AboutPageType } from "../../types";
import "./style.css";

const img =
  "https://www.bentbusinessmarketing.com/wp-content/uploads/2013/02/35844588650_3ebd4096b1_b-1024x683.jpg";
const css = {
  aboutMe: "aboutMe",
  photo: "photo",
  content: "content",
};

export const AboutMePage = () => {
  const { loading, error, data } = useQuery(GET_ABOUT);
  const [aboutData, setAboutData] = useState(undefined);

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
            url={aboutData && `${BlobStarageURL}${aboutData.img}`}
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
