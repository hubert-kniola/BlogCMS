import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import React from "react";
import {
  CalenderIco,
  CustomButton,
  CustomCheckbox,
  Input,
  MainPageMenu,
  OverflowContainer,
  SortToolbarBox,
} from "../../components";
import { ListItem } from "../../components/List/ListItem";
import { BEM } from "../../tools";
import { Post } from "../../types";
import "./style.css";

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

const css = {
  categoryPage: "categoryPage",
  container: "container",
  left: "left",
  header: "header",
  filter: "filter",
  search: "search",
  posts: "posts",
  sort: "sort",
  amount: "amount",
};

export const CategoryPage = () => {
  return (
    <>
      <MainPageMenu />
      <div className={BEM(css.categoryPage, css.container)}>
        <div className={BEM(css.categoryPage, css.left)}>
          <div className={BEM(css.categoryPage, css.header)}>
            Backend development
          </div>
          <div className={BEM(css.categoryPage, css.filter)}>
            <div className={BEM(css.categoryPage, css.search)}>
              <Input placeholder="Wyszukaj..." />
            </div>
            <OverflowContainer header="Kategorie">
              <CustomCheckbox label="Test" />
              <CustomCheckbox label="Test" />
              <CustomCheckbox label="Test" />
              <CustomCheckbox label="Test" />
              <CustomCheckbox label="Test" />
              <CustomCheckbox label="Test" />
              <CustomCheckbox label="Test" />
              <CustomCheckbox label="Test" />
              <CustomCheckbox label="Test" />
            </OverflowContainer>
            <OverflowContainer header="Tagi">
              <CustomCheckbox label="Tag" />
              <CustomCheckbox label="Tag" />
              <CustomCheckbox label="Tag" />
              <CustomCheckbox label="Tag" />
              <CustomCheckbox label="Tag" />
              <CustomCheckbox label="Tag" />
              <CustomCheckbox label="Tag" />
              <CustomCheckbox label="Tag" />
              <CustomCheckbox label="Tag" />
              <CustomCheckbox label="Tag" />
            </OverflowContainer>
            <CustomButton
              label="Filtruj"
              onClickAtionHandler={() => console.log("Filtruje...")}
            />
          </div>
        </div>
        <div className={BEM(css.categoryPage, css.posts)}>
          <div className={BEM(css.categoryPage, css.posts, css.sort)}>
            <div className={BEM(css.categoryPage, css.amount)}>
              Liczba postów: 124
            </div>
            <SortToolbarBox>
              <CalenderIco />
            </SortToolbarBox>
            <SortToolbarBox>
              <SortByAlphaIcon />
            </SortToolbarBox>
          </div>

          {posts.map((post, index) => {
            return <ListItem post={post} index={index} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};
