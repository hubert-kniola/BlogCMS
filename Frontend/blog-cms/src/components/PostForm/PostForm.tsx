import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { CategoryState } from "../../../store/slices/categorySlice";
import { RootState } from "../../../store/store";
import Select from "react-select";
import { BEM } from "../../tools";
import FileUploader from "../FileUploader/FileUploader";
import "./style.css";
import SaveButton from "../SaveButton/SaveButton";
import { useDispatch } from "react-redux";
import { addPost, updatePost } from "../../../store/slices/postSlice";
import { Post } from "../../types";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const exampleCategories: CategoryState[] = [
  {
    title: "Title 1",
    url: "xd",
    subMenu: [],
  },
  {
    title: "Title 2",
    url: "xdd",
    subMenu: [
      { title: "SubTitle2.1", url: "", subMenu: [] },
      {
        title: "SubTitle2.2",
        url: "",
        subMenu: [
          { title: "TagTitle3.1", url: "", subMenu: [] },
          { title: "TagTitle3.2", url: "", subMenu: [] },
        ],
      },
    ],
  },
];

interface PostFormProps {
  type: string;
  handleClose: () => void;
  index: number;
}

const PostForm = ({ type, handleClose, index }: PostFormProps) => {
  const dispatch = useDispatch();
  const categoriesRedux = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const posts = useAppSelector((state: RootState) => state.post.posts);
  const [mainCategory, setMainCategory] = useState<CategoryState>({
    title: null,
    url: null,
    subMenu: [],
  });
  const [subCategory, setSubCategory] = useState<CategoryState>({
    title: null,
    url: null,
    subMenu: [],
  });
  const [tagCategory, setTagCategory] = useState<CategoryState[]>([]);
  const [richValue, setRichValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const initEditedPost = () => {
      if (type === "edit") {
        if (posts[index]) {
          let editedPost = posts[index];
          setTitle(editedPost.title);
          setRichValue(editedPost.content);
          if (editedPost.category[0]) setMainCategory(editedPost.category[0]);
          if (editedPost.category[1]) setSubCategory(editedPost.category[1]);
          if (editedPost.category.length > 2)
            setTagCategory(editedPost.category.splice(0, 2));
        }
      }
    };
    initEditedPost();
  }, []);

  const cssClasses = {
    post: "postForm",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    tag: "tag",
    close: "close",
  };

  const mapCategoriesToOptions = (categories: CategoryState[]): any => {
    const options = categories.map((element) => {
      return {
        value: element,
        label: element.title,
      };
    });
    return options;
  };

  const mapSubCategoriesToOptions = (mainCategory: CategoryState): any => {
    const options = mainCategory.subMenu.map((element) => {
      return { value: element, label: element.title };
    });
    return options;
  };

  const mapTagCategoriesToOptions = (mainCategory: CategoryState): any => {
    const options = mainCategory.subMenu.map((element) => {
      return { value: element, label: element.title };
    });
    return options;
  };

  const handleMainCategory = (event: any) => {
    setMainCategory(event.value);
    setSubCategory({
      title: null,
      url: null,
      subMenu: [],
    });
    setTagCategory([]);
  };

  const handleSubCategory = (event: any) => {
    setSubCategory(event.value);
    setTagCategory([]);
  };

  const handleTagCategory = (event: any) => {
    setTagCategory(event.value);
  };

  const handleRich = (e: any) => {
    setRichValue(e.target.value);
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const savePost = () => {
    const current = new Date();
    const payload: Post = {
      title: title,
      date: `${current.getDate()}-${current.getMonth()}-${current.getFullYear()}`,
      content: richValue,
      snippet: "",
      imgUrl: "",
      category: [mainCategory, subCategory].concat(tagCategory),
    };
    if (type === "add") {
      dispatch(addPost(payload));
    } else {
      dispatch(updatePost({ post: payload, index: index }));
    }
    handleClose();
  };

  const closeIcon = (
    <IconButton onClick={handleClose}>
      <CloseIcon sx={{ color: "#00eadc" }} />
    </IconButton>
  );

  return (
    <div className={BEM(cssClasses.post, cssClasses.container)}>
      <div className={BEM(cssClasses.post, cssClasses.close)}>{closeIcon}</div>
      <h3
        className={BEM(cssClasses.post, cssClasses.container, cssClasses.text)}
      >
        {type === "add" ? "Utwórz post" : "Edytuj post"}
      </h3>
      <div className={BEM(cssClasses.post, cssClasses.elements)}>
        <p>Tytuł:</p>
        <input
          className={BEM(cssClasses.post, cssClasses.title)}
          type="text"
        ></input>
        <p>Treść:</p>
        <textarea
          className="post_textarea"
          value={richValue}
          onChange={handleRich}
        />
        <p>Zdjęcie:</p>
        <FileUploader />
        <p>Kategoria główna:</p>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              outline: state.menuIsOpen && "1px solid #00eadc",
            }),
          }}
          defaultValue={"Brak"}
          placeholder={"Nie wybrano"}
          noOptionsMessage={() => "Brak"}
          name="color"
          options={mapCategoriesToOptions(categoriesRedux)}
          onChange={handleMainCategory}
          defaultInputValue={mainCategory.title}
        />
        <p>Podkategoria:</p>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              outline: state.menuIsOpen && "1px solid #00eadc",
            }),
          }}
          defaultValue={"Brak"}
          escapeClearsValue={!subCategory.title}
          placeholder={"Nie wybrano"}
          noOptionsMessage={() => "Brak"}
          name="color"
          options={mapSubCategoriesToOptions(mainCategory)}
          onChange={handleSubCategory}
          defaultInputValue={subCategory.title}
        />
        <p>Tagi:</p>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              outline: state.menuIsOpen && "1px solid #00eadc",
            }),
          }}
          defaultValue={"Brak"}
          isMulti
          escapeClearsValue={!subCategory.title}
          placeholder={"Nie wybrano"}
          noOptionsMessage={() => "Brak"}
          name="color"
          options={mapTagCategoriesToOptions(subCategory)}
          onChange={handleTagCategory}
        />
      </div>
      <SaveButton
        handleSave={savePost}
        text={type === "add" ? "Dodaj" : "Edytuj"}
      />
    </div>
  );
};

export default PostForm;
