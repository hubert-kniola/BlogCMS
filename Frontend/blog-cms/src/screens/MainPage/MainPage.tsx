import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  GET_ALL_ACTIVE_POSTS,
  GET_FIRST_POST_PREMIER,
} from "../../apollo/apolloQueries";
import {
  Acordeon,
  BestThree,
  Footer,
  List,
  Pomodoro,
  Slider,
} from "../../components";
import { Post } from "../../types";

export const MainPage = () => {
  const [premierPost, setPremierPost] = useState({} as Post | undefined);
  const [activePosts, setActivePosts] = useState([] as Post[]);
  const [date, setDate] = useState<Date>(null);

  const {
    loading: premiereLoading,
    error: premiererror,
    data: premierData,
  } = useQuery(GET_FIRST_POST_PREMIER);
  const {
    loading: activeLoading,
    error: activeError,
    data: activeData,
  } = useQuery(GET_ALL_ACTIVE_POSTS);

  const getPremiertPostData = (data: any): Post | undefined => {
    return data?.firstPostPremier;
  };

  const getActivePostsData = (data: any): Post[] => {
    return data?.activePosts;
  };

  const getLatestPost = (): Post => {
    return activePosts[0] && activePosts[0];
  };

  useEffect(() => {
    if (!premiereLoading) {
      setPremierPost(getPremiertPostData(premierData));
    }
  }, [premiereLoading]);

  useEffect(() => {
    if (premierPost?.publicationDate) {
      setDate(new Date(premierPost?.publicationDate));
    }
  }, [premierPost]);

  useEffect(() => {
    if (!activeLoading) {
      setActivePosts(getActivePostsData(activeData));
    }
  }, [activeLoading]);

  return (
    <>
      <Slider />
      <BestThree />
      {!premiereLoading && !activeLoading && (
        <Pomodoro
          premiere={date != undefined ? date : new Date()}
          title={
            premierPost != undefined
              ? premierPost.title
              : getLatestPost()?.title
          }
        />
      )}
      {!activeLoading && <List activePosts={activePosts} />}
      <Acordeon />
      <Footer />
    </>
  );
};
