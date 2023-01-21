import React, { useEffect, useState } from "react";
import "./style.css";
import { ListItem } from "./ListItem";
import { ContentInput, Post } from "../../types";
import { BEM } from "../../tools";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_ACTIVE_POSTS,
  GET_LAST_POST_TITLE_CONTENT,
} from "../../apollo/apolloQueries";

const css = {
  container: "listContainer",
  posts: "posts",
  title: "title",
};

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const url1 =
  "https://previews.123rf.com/images/datsenkomarina/datsenkomarina1801/datsenkomarina180100123/93153161-beautiful-view-of-the-tropical-beach-of-sri-lanka-on-a-sunny-day.jpg";
const url2 =
  "https://res.klook.com/image/upload/c_fill,w_1160,h_460,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/51988759-Sarangkot-Sunrise-View.webp";

const posts: Post[] = [
  {
    title: "Post 1",
    publicationDate: "25/10/2022",
    content: lorem,
    primaryImgName: url1,
    snippet: "",
  },
  {
    title: "Post 2",
    publicationDate: "26/10/2022",
    content: lorem,
    primaryImgName: url2,
    snippet: "",
  },
  {
    title: "Post 3",
    publicationDate: "27/10/2022",
    content: lorem,
    primaryImgName: url1,
    snippet: "",
  },
  {
    title: "Post 4",
    publicationDate: "28/10/2022",
    content: lorem,
    primaryImgName: url2,
    snippet: "",
  },
  {
    title: "Post 5",
    publicationDate: "29/10/2022",
    content: lorem,
    primaryImgName: url1,
    snippet: "",
  },
  {
    title: "Post 6",
    publicationDate: "29/10/2022",
    content: lorem,
    primaryImgName: url1,
    snippet: "",
  },
  {
    title: "Post 7",
    publicationDate: "29/10/2022",
    content: lorem,
    primaryImgName: url1,
    snippet: "",
  },
];

interface IListInterface {
  activePosts: Post[];
}

export const List = ({ activePosts }: IListInterface) => {
  const [title, setTitle] = useState<string>();
  const { loading, data, error } = useQuery(GET_LAST_POST_TITLE_CONTENT);

  const getTitleContent = (data: any): ContentInput => {
    return data?.lastPostTitleContent;
  };

  useEffect(() => {
    if (!loading) {
      setTitle(getTitleContent(data)?.value);
    }
  }, [loading]);

  return (
    <>
      {!loading && (
        <div className={BEM(css.container)}>
          <div className={BEM(css.container, css.posts, css.title)}>
            {title ? (
              title
            ) : (
              <>
                Hej!
                <br />
                Sprawdź moje
                <br />
                ostatnie posty
              </>
            )}
          </div>
          <div className={BEM(css.container, css.posts)}>
            {activePosts.slice(0, 5).map((post, index) => {
              return <ListItem post={post} index={index} key={index} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};
