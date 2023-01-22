import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ABOUT, GET_POSTS_BY_ID } from "../../apollo/apolloQueries";
import {
  BackgroundDiv,
  BestThree,
  Gallery,
  MainPageMenu,
} from "../../components";
import { ClockIco } from "../../components/Ico";
import Spinner from "../../components/Spinner/Spinner";
import { BlobStorageURL } from "../../settings";
import { BEM, GetDate } from "../../tools";
import { AboutPageType, Post } from "../../types";
import "./style.css";

const css = {
  postPage: "postPage",
  container: "container",
  title: "title",
  author: "author",
  picture: "picture",
  name: "name",
  date: "date",
  time: "time",
  content: "content",
};

const path = window.location.pathname;

export const PostPage = () => {
  const [post, setPost] = useState(null as Post);
  const [aboutData, setAboutData] = useState(undefined as AboutPageType);

  const { loading, error, data } = useQuery(GET_POSTS_BY_ID, {
    variables: { id: path.substring(path.lastIndexOf("/") + 1) },
  });
  const {
    loading: loadingAbout,
    error: errorAbout,
    data: dataAbout,
  } = useQuery(GET_ABOUT);

  const getPostData = (data: any): Post => {
    console.log(data);
    return data?.postById;
  };

  const getAboutData = (data: any): AboutPageType => {
    return data?.about[0];
  };

  useEffect(() => {
    if (!loading) {
      setPost(getPostData(data));
    }
  }, [loading]);

  useEffect(() => {
    if (!loadingAbout) {
      setAboutData(getAboutData(dataAbout));
    }
  }, [loadingAbout]);

  return (
    <>
      {loading && post !== null && !loadingAbout ? (
        <Spinner />
      ) : (
        <>
          <MainPageMenu />
          <div className={BEM(css.postPage, css.container)}>
            <div className={BEM(css.postPage, css.title)}>
              <br />
              <h1>{post?.title}</h1>
              <p> {post?.snippet}</p>
            </div>
            <div className={BEM(css.postPage, css.author)}>
              <BackgroundDiv
                url={`${BlobStorageURL}${aboutData?.imgName}`}
                className={BEM(css.postPage, css.author, css.picture)}
              />
              <div className={BEM(css.postPage, css.author, css.name)}>
                Paweł Nowak
              </div>
              <div className={BEM(css.postPage, css.author, css.date)}>
                {GetDate(post?.publicationDate.toLocaleString(), true)}
              </div>
              <div className={BEM(css.postPage, css.author, css.time)}>
                <ClockIco />
                <p>{post?.timeToReadInMs} min</p>
              </div>
            </div>
            {post?.primaryImgName && (
              <BackgroundDiv
                url={`${BlobStorageURL}${post?.primaryImgName}`}
                className={BEM(css.postPage, css.picture)}
              />
            )}
            <div className={BEM(css.postPage, css.content)}>
              <div dangerouslySetInnerHTML={{ __html: post?.content }} />
            </div>
            {post?.contentImgName.length > 0 && (
              <Gallery images={post.contentImgName} />
            )}
            <br />
          </div>
          <BestThree />
        </>
      )}
    </>
  );
};
