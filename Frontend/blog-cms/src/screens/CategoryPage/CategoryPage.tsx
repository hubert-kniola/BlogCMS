import { useQuery } from "@apollo/client";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import React, { useEffect, useState } from "react";
import {
  GET_ALL_SUB_CATEGORIES_BY_PATH,
  GET_POST_BY_PATH,
} from "../../apollo/apolloQueries";
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
import { CategoryType, Post } from "../../types";
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
  const [loading, setLoading] = useState(true);

  const [calenderActive, setCalenderActive] = useState(false);
  const [calenderDesc, setCalenderDesc] = useState(true);
  const [calenderAsc, setCalenderAsc] = useState(false);

  const [alphabetActive, setAlphabetActive] = useState(false);
  const [alphabetDesc, setAlphabetDesc] = useState(true);
  const [alphabetAsc, setAlphabetAsc] = useState(false);

  const [posts, setPosts] = useState([] as Post[]);
  const [currentPosts, setCurrentPosts] = useState([] as Post[]);
  const [mainCategory, setMainCategory] = useState(null as CategoryType);
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [currentCategories, setCurrentCategories] = useState(
    [] as CategoryType[]
  );
  const [tags, setTags] = useState([] as CategoryType[]);
  const [currnetTags, setCurrentTags] = useState([] as CategoryType[]);
  const [searchValue, setSearchValue] = useState("");

  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
  } = useQuery(GET_POST_BY_PATH, {
    variables: { path: window.location.pathname },
  });

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(GET_ALL_SUB_CATEGORIES_BY_PATH, {
    variables: { path: window.location.pathname },
  });

  const getPostByPath = (data: any): Post[] => {
    return data?.postByPath;
  };

  const getCategoriesByPath = (data: any): CategoryType[] => {
    return data?.allSubCategoriesByPath;
  };

  const sortByTitle = (posts: Post[], desc = true): Post[] =>
    posts
      .slice()
      .sort((a, b) =>
        desc ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
      );

  const sortByCalendar = (posts: Post[], desc = true): Post[] =>
    posts.slice().sort((a, b) => {
      let dateA = new Date(a.publicationDate.toLocaleString()).getTime();
      let dateB = new Date(b.publicationDate.toLocaleString()).getTime();
      return desc ? dateB - dateA : dateA - dateB;
    });

  const onCalenderClick = () => {
    if (!calenderActive) {
      setCalenderActive(true);
      setCalenderDesc(true);
    } else if (calenderActive && calenderDesc) {
      setCalenderDesc(false);
      setCalenderAsc(true);
    } else if (calenderActive && calenderAsc) {
      setCalenderActive(false);
      setCalenderAsc(false);
    }
  };

  const onAlphabetClick = () => {
    if (!alphabetActive) {
      setAlphabetActive(true);
      setAlphabetDesc(true);
    } else if (alphabetActive && alphabetDesc) {
      setAlphabetDesc(false);
      setAlphabetAsc(true);
    } else if (alphabetActive && alphabetAsc) {
      setAlphabetActive(false);
      setAlphabetAsc(false);
    }
  };

  const onCalenderIcoClickHanlder = (value: boolean) => {
    setAlphabetActive(false);
    setCalenderActive(value);
  };

  const onAlphabetIcoClickHanlder = (value: boolean) => {
    setCalenderActive(false);
    setAlphabetActive(value);
  };

  useEffect(() => {
    if (!postsLoading) {
      setPosts(getPostByPath(postsData));
      setCurrentPosts(getPostByPath(postsData));
    }
  }, [postsLoading]);

  useEffect(() => {
    if (alphabetActive) {
      let tempPosts = sortByTitle(posts, alphabetDesc);
      setCurrentPosts(tempPosts);
    } else if (calenderActive) {
      let tempPosts = sortByCalendar(posts, calenderDesc);
      setCurrentPosts(tempPosts);
    } else {
      setCurrentPosts(posts);
    }
  }, [alphabetActive, alphabetDesc, calenderActive, calenderDesc]);

  useEffect(() => {
    if (!categoriesLoading) {
      const downloadedCategories = getCategoriesByPath(categoriesData);
      let tempCategories = [] as CategoryType[];
      let tempTags = [] as CategoryType[];

      downloadedCategories.forEach((item, idx) => {
        if (idx === 0) {
          setMainCategory(item);
        } else if (item?.deephLvl == 3) {
          tempTags.push(item);
        } else {
          tempCategories.push(item);
        }
      });

      setCategories(tempCategories);
      setCurrentCategories(tempCategories);
      setTags(tempTags);
      setCurrentTags(tempTags);
    }
  }, [categoriesLoading]);

  useEffect(() => {
    if (searchValue.length > 0) {
      let tempPosts = currentPosts;
      tempPosts = [...tempPosts.filter((x) => x.title.includes(searchValue))];
      setCurrentPosts(tempPosts);
    } else {
      setCurrentPosts(posts);
    }
  }, [searchValue]);

  return (
    <>
      <MainPageMenu />

      {postsLoading ? (
        <Spinner />
      ) : setInterval(() => {
          currentPosts.length > 0 || searchValue !== "";
        }, 50) ? (
        <div className={BEM(css.categoryPage, css.container)}>
          {mainCategory && (
            <div className={BEM(css.categoryPage, css.left)}>
              <div className={BEM(css.categoryPage, css.header)}>
                {mainCategory.title}
              </div>
              <div className={BEM(css.categoryPage, css.filter)}>
                <div className={BEM(css.categoryPage, css.search)}>
                  <Input
                    placeholder="Wyszukaj..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.currentTarget.value)}
                  />
                </div>
                {currentCategories.length >= 2 && (
                  <OverflowContainer header="Kategorie">
                    {!categoriesLoading &&
                      currentCategories.map((item, idx) => {
                        return <CustomCheckbox label={item.title} key={idx} />;
                      })}
                  </OverflowContainer>
                )}
                {currnetTags.length >= 2 && (
                  <OverflowContainer header="Tagi">
                    {!categoriesLoading &&
                      currnetTags.map((item, idx) => {
                        return <CustomCheckbox label={item.title} key={idx} />;
                      })}
                  </OverflowContainer>
                )}
                <CustomButton
                  label="Filtruj"
                  onClickAtionHandler={() => console.log("Filtruje...")}
                />
              </div>
            </div>
          )}
          <div className={BEM(css.categoryPage, css.posts)}>
            <div className={BEM(css.categoryPage, css.posts, css.sort)}>
              <div className={BEM(css.categoryPage, css.amount)}>
                Liczba postów: {currentPosts.length}
              </div>
              <SortToolbarBox
                isActive={calenderActive}
                setIsActive={onCalenderIcoClickHanlder}>
                <CalenderIco onClick={onCalenderClick} />
              </SortToolbarBox>
              <SortToolbarBox
                isActive={alphabetActive}
                setIsActive={onAlphabetIcoClickHanlder}>
                <SortByAlphaIcon onClick={onAlphabetClick} />
              </SortToolbarBox>
            </div>

            {!postsLoading &&
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
