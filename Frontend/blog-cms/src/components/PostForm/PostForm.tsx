import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useAppSelector } from "../../../store/hooks";
import { CategoryState } from "../../../store/slices/categorySlice";
import { updateTop3 } from "../../../store/slices/configureSlice";
import { addPost, updatePost } from "../../../store/slices/postSlice";
import { RootState } from "../../../store/store";
import {
  AddImageToAzure,
  BEM,
  ConvertFromHtmlToEditorState,
  GetGTMDate,
} from "../../tools";
import {
  AdminInsertPostForm,
  AdminUpdatePostForm,
  UploadType,
} from "../../types";
import { mainColor } from "../../types/consts";
import EditorModal from "../EditorModal/EditorModal";
import FileUploader from "../FileUploader/FileUploader";
import SaveButton from "../SaveButton/SaveButton";
import { ActionType } from "../../types";

import "./style.css";
import { INSERT_POST, UPDATE_POST } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";

const exampleCategories: CategoryState[] = [
  {
    title: "Title 1",
    path: "xd",
    subCategory: [],
  },
  {
    title: "Title 2",
    path: "xdd",
    subCategory: [
      { title: "SubTitle2.1", path: "", subCategory: [] },
      {
        title: "SubTitle2.2",
        path: "",
        subCategory: [
          { title: "TagTitle3.1", path: "", subCategory: [] },
          { title: "TagTitle3.2", path: "", subCategory: [] },
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
  const top3 = useAppSelector((state: RootState) => state.configure.top3);
  const posts = useAppSelector((state: RootState) => state.post.posts);
  const [mainCategory, setMainCategory] = useState({
    id: null,
    title: null,
    path: null,
    subCategory: [],
  });
  const [subCategory, setSubCategory] = useState({
    id: null,
    title: null,
    path: null,
    subCategory: [],
  });
  const [tagCategory, setTagCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [richValue, setRichValue] = useState(() => EditorState.createEmpty());
  const [mainSelectedFile, setMainSelectedFile] = useState<File>(null);
  const [mainFileName, setMainFileName] = useState<string>("");
  const [sideSelectedFiles, setSideSelectedFiles] = useState<File[]>(null);
  const [sideFileNames, setSideFileNames] = useState<string[]>([]);
  const [snippet, setSnippet] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [timeToRead, setTimeToRead] = useState<number>(null);
  const [placeInPopular, setPlaceInPopular] = useState<boolean>(false);
  const [publicDate, setPublicDate] = useState<Dayjs | null>(null);
  const [publicOnDate, setPublicOnDate] = useState<boolean>(false);
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [disableOnClick, setDisableOnClick] = useState<boolean>(false);
  const [insertPostMutation, { data, loading, error }] =
    useMutation(INSERT_POST);
  const [updatePostMutation] = useMutation(UPDATE_POST);

  useEffect(() => {
    const initEditedPost = () => {
      if (type === ActionType.Edit) {
        if (posts[index]) {
          let editedPost = posts[index];
          setTitle(editedPost.title);
          setMainSelectedFile(editedPost.mainImage);
          setSideSelectedFiles(editedPost.sideImages);
          setRichValue(ConvertFromHtmlToEditorState(editedPost.content));
          if (editedPost.categories.length > 0) {
            let elements = mapCategoriesToOptions(editedPost.categories);
            elements.pop();
            elements[2] = mapCategoriesToOptions([editedPost.categories[2]]);
            setSelectedCategories(elements);
          }
          setSnippet(editedPost.snippet);
          setTimeToRead(editedPost.timeToReadInMs);
          setPlaceInPopular(editedPost.placeInPopular);
          setPublicOnDate(editedPost.publicOnDate);
          setPublicDate(editedPost.publicationDate);
          if (editedPost.categories[0])
            setMainCategory(editedPost.categories[0]);
          if (editedPost.categories[1])
            setSubCategory(editedPost.categories[1]);
          if (editedPost.categories.length > 2)
            setTagCategory(editedPost.categories[2]);
        }
      }
    };
    initEditedPost();
    const handleInsertActionRedux = () => {
      if (type === ActionType.Add && data) {
        let category = [];
        if (mainCategory.title) {
          category.push(mainCategory);
          subCategory.title !== null && category.push(subCategory);
          tagCategory && category.push(tagCategory);
        }
        const reduxPayload: any = {
          id: data.createPost.id,
          title: title,
          publicationDate:
            publicOnDate && publicDate ? publicDate.toString() : GetGTMDate(),
          content: convertToHTML(richValue.getCurrentContent()),
          snippet: snippet,
          timeToReadInMs: timeToRead.toString(),
          mainImage: mainSelectedFile,
          sideImages: sideSelectedFiles,
          categories: category,
          publicOnDate: publicOnDate,
          placeInPopular: placeInPopular,
        };
        dispatch(addPost(reduxPayload));
        setDisableOnClick(true);
        handleClose();
      }
    };
    handleInsertActionRedux();
  }, [data]);

  const cssClasses = {
    post: "postForm",
    container: "container",
    text: "text",
    textarea: "textarea",
    editor: "editor",
    elements: "elements",
    title: "title",
    tag: "tag",
    close: "close",
    padding: "padding",
    header: "header",
    content: "content",
    footer: "footer",
    selects: "selects",
    datepicker: "datepicker",
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
    const options = mainCategory.subCategory.map((element) => {
      return { value: element, label: element.title };
    });
    return options;
  };

  const mapTagCategoriesToOptions = (mainCategory: CategoryState): any => {
    const options = mainCategory.subCategory.map((element) => {
      return { value: element, label: element.title };
    });
    return options;
  };

  const handleMainCategory = (event: any, index: number) => {
    setMainCategory(event.value);
    setSubCategory({
      id: null,
      title: null,
      path: null,
      subCategory: [],
    });
    setTagCategory([]);
    let items = selectedCategories;
    Object.assign(items, { [index]: event });
    setSelectedCategories(items);
  };

  const handleSubCategory = (event: any, index: number) => {
    setSubCategory(event.value);
    setTagCategory([]);
    let items = selectedCategories;
    Object.assign(items, { [index]: event });
    setSelectedCategories(items);
  };

  const handleTagCategory = (event: any, index: number) => {
    let newTagCategory = event.map((e: any) => e.value);
    setTagCategory(newTagCategory);
    let items = selectedCategories;
    Object.assign(items, { [index]: event });
    setSelectedCategories(items);
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleSnippet = (e: any) => {
    setSnippet(e.target.value);
  };

  const handleTimeToRead = (e: any) => {
    setTimeToRead(+e.target.value);
  };

  const handlePublicOnDate = () => {
    setPublicOnDate(!publicOnDate);
  };

  const handlePlaceInPopular = () => {
    setPlaceInPopular(!placeInPopular);
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const handleMainSelectedFile = (e: File) => {
    setMainSelectedFile(e);
  };

  //TODO
  const handleSideSelectedFiles = (e: File[]) => {
    setSideSelectedFiles(e);
  };

  const mapCategoriesToPostCategories = (categories: any[]) => {
    let newCategories = categories.map((element) => {
      return { id: element.id, title: element.title, path: element.path };
    });
    return newCategories;
  };

  const savePost = async () => {
    if (
      mainSelectedFile &&
      (type === ActionType.Add ||
        (type === ActionType.Edit &&
          mainSelectedFile !== posts[index].mainImage))
    ) {
      const mainFileName: any = await AddImageToAzure([mainSelectedFile]);
      setMainFileName(mainFileName[0].newName);
    }
    if (
      sideSelectedFiles &&
      (type === ActionType.Add ||
        (type === ActionType.Edit &&
          sideSelectedFiles !== posts[index].sideImages))
    ) {
      const sideFileNames: any = await AddImageToAzure(sideSelectedFiles);
      let sideFiles = [];
      sideFileNames.map((element: any) => sideFiles.push(element.newName));
      setSideFileNames(sideFileNames);
    }
    //let categoryNames = [];
    let category = [];
    if (mainCategory.title) {
      category.push(mainCategory);
      //categoryNames.push(mainCategory.id);
      if (subCategory.title !== null) {
        category.push(subCategory);
        //categoryNames.push(subCategory.id);
      }
      if (tagCategory) {
        category.push(tagCategory);
        //tagCategory.map((element) => categoryNames.push(element.id));
      }
    }
    const payload: any = {
      title: title,
      content: convertToHTML(richValue.getCurrentContent()),
      snippet: snippet,
      timeToReadInMs: timeToRead.toString(),
      primaryImgName: mainFileName,
      contentImgName: sideFileNames,
      publicationDate:
        publicOnDate && publicDate ? publicDate.toString() : GetGTMDate(),
      categories: mapCategoriesToPostCategories(category),
    };
    if (type === ActionType.Add) {
      insertPostMutation({ variables: payload as AdminInsertPostForm });
      setDisableOnClick(true);
    } else {
      const reduxPayload: any = {
        id: posts[index].id,
        title: title,
        publicationDate:
          publicOnDate && publicDate ? publicDate.toString() : GetGTMDate(),
        content: convertToHTML(richValue.getCurrentContent()),
        snippet: snippet,
        timeToReadInMs: timeToRead.toString(),
        mainImage: mainSelectedFile,
        sideImages: sideSelectedFiles,
        categories: category,
        publicOnDate: publicOnDate,
        placeInPopular: placeInPopular,
      };
      dispatch(updatePost({ post: reduxPayload, index: index }));
      updatePostMutation({
        variables: { id: posts[index].id, ...payload } as AdminUpdatePostForm,
      });
      if (top3 && top3.filter((e) => e.title === title)) {
        let newTop3 = top3.slice();
        const ix = top3.findIndex((r) => r.title === posts[index].title);
        newTop3[ix] = payload;
        dispatch(updateTop3(newTop3));
      }
      setDisableOnClick(true);
      handleClose();
    }
  };

  const closeIcon = (
    <IconButton onClick={handleClose}>
      <CloseIcon sx={{ color: mainColor }} />
    </IconButton>
  );

  return (
    <>
      <div className={BEM(cssClasses.post, cssClasses.container)}>
        <div className={BEM(cssClasses.post, cssClasses.header)}>
          <div className={BEM(cssClasses.post, cssClasses.close)}>
            {closeIcon}
          </div>
          <h3
            className={BEM(
              cssClasses.post,
              cssClasses.container,
              cssClasses.text
            )}
          >
            {type === ActionType.Add ? "Utwórz post" : "Edytuj post"}
          </h3>
        </div>
        <div className={BEM(cssClasses.post, cssClasses.content)}>
          <div className={BEM(cssClasses.post, cssClasses.elements)}>
            <p>Tytuł:</p>
            <input
              className={BEM(cssClasses.post, cssClasses.title)}
              type="text"
              value={title}
              onChange={handleTitle}
            ></input>
            <p>Krótki opis (snippet):</p>
            <textarea
              className={BEM(cssClasses.post, cssClasses.textarea)}
              value={snippet}
              onChange={handleSnippet}
            />
            <p>Czas na przeczytanie (min):</p>
            <input
              className={BEM(cssClasses.post, cssClasses.title)}
              type="number"
              value={timeToRead}
              onChange={handleTimeToRead}
            ></input>
            <p>Treść:</p>
            <Button
              sx={{
                borderRadius: "2px",
                marginTop: "1rem",
                color: mainColor,
                borderColor: mainColor,
                width: "10vw",
                "&:hover": {
                  backgroundColor: mainColor,
                  color: "white",
                  borderColor: "white",
                },
              }}
              variant="outlined"
              component="label"
              onClick={() => setOpenEditor(true)}
            >
              Modyfikuj
            </Button>
            <p>Zdjęcie główne:</p>
            <FileUploader
              type={UploadType.Single}
              inputFile={mainSelectedFile}
              changeInputFile={handleMainSelectedFile}
            />
            <p>Zdjęcia poboczne:</p>
            <FileUploader
              type={UploadType.Multi}
              count={10}
              inputFile={sideSelectedFiles}
              changeInputFile={handleSideSelectedFiles}
            />
            <div className={BEM(cssClasses.post, cssClasses.selects)}>
              <p>Kategoria główna:</p>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    marginTop: "1rem",
                    marginLeft: "0.1rem",
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "hotpink",
                    primary: mainColor,
                  },
                })}
                defaultValue={"Brak"}
                value={
                  Object.values(selectedCategories).length >= 1 &&
                  (Object.values(selectedCategories)[0] as any)
                }
                placeholder={"Nie wybrano"}
                noOptionsMessage={() => "Brak"}
                name="color"
                options={mapCategoriesToOptions(categoriesRedux)}
                onChange={(e) => handleMainCategory(e, 0)}
                defaultInputValue={mainCategory.title}
              />
              <p>Podkategoria:</p>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    marginTop: "1rem",
                    marginLeft: "0.1rem",
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "hotpink",
                    primary: mainColor,
                  },
                })}
                defaultValue={"Brak"}
                value={
                  Object.values(selectedCategories).length >= 1 &&
                  (Object.values(selectedCategories)[1] as any)
                }
                placeholder={"Nie wybrano"}
                noOptionsMessage={() => "Brak"}
                name="color"
                options={mapSubCategoriesToOptions(mainCategory)}
                onChange={(e) => handleSubCategory(e, 1)}
                defaultInputValue={subCategory.title}
              />
              <p>Tagi:</p>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    marginTop: "1rem",
                    marginLeft: "0.1rem",
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "hotpink",
                    primary: mainColor,
                  },
                })}
                defaultValue={"Brak"}
                value={
                  Object.values(selectedCategories).length >= 3 &&
                  Object.values(selectedCategories)[2]
                }
                isMulti
                placeholder={"Nie wybrano"}
                noOptionsMessage={() => "Brak"}
                name="color"
                options={mapTagCategoriesToOptions(subCategory)}
                onChange={(e) => handleTagCategory(e, 2)}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={placeInPopular}
                  onChange={handlePlaceInPopular}
                  sx={{
                    color: mainColor,
                    "&.Mui-checked": {
                      color: mainColor,
                    },
                  }}
                />
              }
              label="Wyświetlaj w popularnych"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={publicOnDate}
                  onChange={handlePublicOnDate}
                  sx={{
                    color: mainColor,
                    "&.Mui-checked": {
                      color: mainColor,
                    },
                  }}
                />
              }
              label="Opublikuj w wybranym momencie"
            />
            {publicOnDate && (
              <div className={BEM(cssClasses.post, cssClasses.datepicker)}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Data publikacji"
                    disablePast
                    value={publicDate}
                    onChange={(newValue) => {
                      setPublicDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: mainColor,
                              color: mainColor,
                            },
                          },
                          "& label.Mui-focused": {
                            color: mainColor,
                          },
                        }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            )}
          </div>
        </div>
        <div className={BEM(cssClasses.post, cssClasses.footer)}>
          <SaveButton
            handleSave={savePost}
            text={type === ActionType.Add ? "Dodaj" : "Edytuj"}
            disable={disableOnClick}
          />
        </div>
      </div>
      <EditorModal
        handleClose={handleCloseEditor}
        open={openEditor}
        editorValue={richValue}
        setEditorValue={(element: any) => setRichValue(element)}
      />
    </>
  );
};

export default PostForm;
