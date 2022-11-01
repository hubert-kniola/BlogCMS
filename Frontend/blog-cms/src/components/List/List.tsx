import React from "react";
import "./style.css";
import { ListItem } from "./ListItem";
import { Post } from "../../types";
import { BEM } from "../../tools";

const css = {
    container: "listContainer",
  };

const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const url1= 'https://previews.123rf.com/images/datsenkomarina/datsenkomarina1801/datsenkomarina180100123/93153161-beautiful-view-of-the-tropical-beach-of-sri-lanka-on-a-sunny-day.jpg'
const url2 = "https://res.klook.com/image/upload/c_fill,w_1160,h_460,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/51988759-Sarangkot-Sunrise-View.webp"

const posts: Post[]= [
    {title: "Post 1", date: "25/10/2022", content: lorem, imgUrl: url1},
    {title: "Post 2", date: "26/10/2022", content: lorem, imgUrl: url2},
    {title: "Post 3", date: "27/10/2022", content: lorem, imgUrl: url1},
    {title: "Post 4", date: "28/10/2022", content: lorem, imgUrl: url2},
    {title: "Post 5", date: "29/10/2022", content: lorem, imgUrl: url1},
    {title: "Post 6", date: "29/10/2022", content: lorem, imgUrl: url1},
    {title: "Post 7", date: "29/10/2022", content: lorem, imgUrl: url1},
]

export const List = () => {
    return (
      <div className={BEM(css.container)}>
        {posts.slice(0,5).map((post, index) => {
          return <ListItem post={post} index={index} key={index} />;
        })}
      </div>
    );
}

