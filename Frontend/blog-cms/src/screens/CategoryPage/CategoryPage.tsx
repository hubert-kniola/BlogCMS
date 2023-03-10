import { useQuery } from "@apollo/client";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { check } from "prettier";
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
import { CategoryState, CategoryType, Post, PostItemType } from "../../types";
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
  const [currentSearchPosts, setCurrentSearchPosts] = useState([] as Post[]);
  const [mainCategory, setMainCategory] = useState(null as CategoryType);
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [currentCategories, setCurrentCategories] = useState(
    [] as CategoryState[]
  );
  const [tags, setTags] = useState([] as CategoryType[]);
  const [currnetTags, setCurrentTags] = useState([] as CategoryState[]);
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

  const mapCategoriesToCategoriesState = (
    categories: CategoryType[]
  ): CategoryState[] => {
    return categories.map((category) => ({ category, active: false }));
  };

  const changeCategoryState = (categoryIdx: number) => {
    let tempCategories = currentCategories;
    tempCategories[categoryIdx].active = !tempCategories[categoryIdx].active;
    setCurrentCategories(tempCategories);
  };

  const changeTagState = (tagIdx: number) => {
    let tempTags = currnetTags;
    tempTags[tagIdx].active = !tempTags[tagIdx].active;
    setCurrentTags(tempTags);
  };

  const onFilterButtonClickHandler = () => {
    let checkedCategory = [] as CategoryType[];

    currentCategories.forEach(({ category, active }) => {
      active && checkedCategory.push(category);
    });

    currnetTags.forEach(({ category, active }) => {
      active && checkedCategory.push(category);
    });

    let tempPosts = searchValue.length > 0 ? currentSearchPosts : posts;
    let filteredPost = [] as Post[];

    if (checkedCategory.length > 0) {
      checkedCategory.forEach((category) => {
        let posts = tempPosts.filter(
          (x) =>
            x.categoryTree?.mainCategory?.id === category.id ||
            x.categoryTree?.subCategory?.id === category.id ||
            x.categoryTree?.tags?.find((x) => x.id === category.id)
        );

        posts.forEach((post) => {
          if (!filteredPost.find((x) => x.id === post.id)) {
            filteredPost.push(post);
          }
        });
      });

      setCurrentPosts(filteredPost);
    } else {
      setCurrentPosts(searchValue.length > 0 ? currentSearchPosts : posts);
    }
  };

  useEffect(() => {
    if (!postsLoading) {
      setPosts(getPostByPath(postsData));
      setCurrentPosts(getPostByPath(postsData));
    }
  }, [postsLoading]);

  useEffect(() => {
    if (alphabetActive) {
      let tempPosts = sortByTitle(currentPosts, alphabetDesc);
      setCurrentPosts(tempPosts);
    } else if (calenderActive) {
      let tempPosts = sortByCalendar(currentPosts, calenderDesc);
      setCurrentPosts(tempPosts);
    } else if (searchValue.length > 0) {
      setCurrentPosts(currentSearchPosts);
    } else {
      onFilterButtonClickHandler();
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
      setCurrentCategories(mapCategoriesToCategoriesState(tempCategories));
      setTags(tempTags);
      setCurrentTags(mapCategoriesToCategoriesState(tempTags));
    }
  }, [categoriesLoading]);

  useEffect(() => {
    if (searchValue.length > 0) {
      let tempPosts = currentPosts;
      tempPosts = [...tempPosts.filter((x) => x.title.includes(searchValue))];
      setCurrentPosts(tempPosts);
      setCurrentSearchPosts(tempPosts);
    } else {
      onFilterButtonClickHandler();
    }
  }, [searchValue]);

  return (
    <>
      <MainPageMenu />

      {postsLoading ? (
        <Spinner />
      ) : posts.length > 0 ? (
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
                      currentCategories.map(({ category, active }, idx) => (
                        <CustomCheckbox
                          label={category.title}
                          key={idx}
                          onClickAction={() => changeCategoryState(idx)}
                        />
                      ))}
                  </OverflowContainer>
                )}
                {currnetTags.length >= 2 && (
                  <OverflowContainer header="Tagi">
                    {!categoriesLoading &&
                      currnetTags.map(({ category, active }, idx) => (
                        <CustomCheckbox
                          label={category.title}
                          key={idx}
                          onClickAction={() => changeTagState(idx)}
                        />
                      ))}
                  </OverflowContainer>
                )}
                {(categories?.length > 1 || tags?.length > 1) && (
                  <CustomButton
                    label="Filtruj"
                    onClickAtionHandler={() => onFilterButtonClickHandler()}
                  />
                )}
              </div>
            </div>
          )}
          <div className={BEM(css.categoryPage, css.posts)}>
            <div className={BEM(css.categoryPage, css.posts, css.sort)}>
              <div className={BEM(css.categoryPage, css.amount)}>
                Liczba post??w: {currentPosts.length}
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
