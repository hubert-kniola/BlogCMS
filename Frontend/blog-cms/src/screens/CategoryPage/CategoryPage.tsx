import { useQuery } from "@apollo/client";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { multiply } from "lodash";
import React, { useEffect, useState } from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { GET_POST_BY_PATH } from "../../apollo/apolloQueries";
import {
  CalenderIco,
  CustomButton,
  CustomCheckbox,
  Empty,
  Input,
  MainPageMenu,
  OverflowContainer,
  SortToolbarBox,
} from "../../components";
import { ListItem } from "../../components/List/ListItem";
import Spinner from "../../components/Spinner/Spinner";
import { BEM } from "../../tools";
import { Post } from "../../types";
import "./style.css";

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
  const [posts, setPosts] = useState([] as Post[]);
  const [currentPosts, setCurrentPosts] = useState([] as Post[]);

  const { loading, error, data } = useQuery(GET_POST_BY_PATH, {
    variables: { path: window.location.pathname },
  });

  const getPostByCategoryId = (data: any): Post[] => {
    return data?.postByPath;
  };

  useEffect(() => {
    if (!loading) {
      setPosts(getPostByCategoryId(data));
    }
  }, [loading]);

  useEffect(() => {
    if (posts && currentPosts.length === 0) {
      setCurrentPosts(posts);
    }
  }, [posts]);

  return (
    <>
      <MainPageMenu />

      {loading ? (
        <Spinner />
      ) : currentPosts.length > 0 ? (
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
                Liczba postów: {currentPosts.length}
              </div>
              <SortToolbarBox>
                <CalenderIco />
              </SortToolbarBox>
              <SortToolbarBox>
                <SortByAlphaIcon />
              </SortToolbarBox>
            </div>

            {!loading &&
              currentPosts.map((post, index) => {
                return <ListItem post={post} index={index} key={index} />;
              })}
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};
