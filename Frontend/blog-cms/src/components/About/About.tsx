import Button from "@mui/material/Button";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUploader from "../FileUploader/FileUploader";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateAbout } from "../../../store/slices/aboutSlice";
import { RootState } from "../../../store/store";
import {
  BEM,
  ConvertFromHtmlToEditorState,
  AddImageToAzure,
} from "../../tools";
import { mainColor } from "../../types/consts";
import EditorModal from "../EditorModal/EditorModal";
import "./style.css";
import { AdminAboutForm, UploadType } from "../../types";
import { UPDATE_ABOUT } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";

interface IFormInput {
  title: string;
  text: string;
  file: any;
  imgName?: string;
}

export const About = () => {
  const cssClasses = {
    about: "about",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    textarea: "textarea",
    required: "required",
  };
  const dispatch = useAppDispatch();
  const about = useAppSelector((state: RootState) => state.about);
  const [updateAboutMutation, { data, loading, error }] =
    useMutation(UPDATE_ABOUT);
  const { register, setValue, formState: { errors }, handleSubmit } = useForm<IFormInput>();
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [richValue, setRichValue] = useState(() => EditorState.createEmpty());
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    //data["img"] = selectedFile;
    data["text"] = convertToHTML(richValue.getCurrentContent());
    data["file"] = selectedFile;
    let file = null;
    if(selectedFile !== about.file)
    {
      file = await AddImageToAzure([selectedFile]);
    }
    data["imgName"] = (file?.fileNames && file?.fileNames[0]?.newName) ? file.fileNames[0].newName : about.imgName;
    dispatch(updateAbout(data));
    updateAboutMutation({
      variables: {
        id: about.id,
        title: data.title,
        text: data.text,
        imgName: data.imgName,
      } as AdminAboutForm,
    });
    notify();
  };

  useEffect(() => {
    const fetchData = () => {
      3;
      //TODO - implement load from redux after login fetch
      setValue("title", about.title);
      about.text && setRichValue(ConvertFromHtmlToEditorState(about.text));
      about.file && setSelectedFile(about.file);
    };

    fetchData();
  }, []);

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const handleSelectedFile = (e: File) => {
    setSelectedFile(e);
  };

  const notify = () => {
    toast.success(" Zapisano", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={BEM(cssClasses.about, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.about,
            cssClasses.container,
            cssClasses.text
          )}
        >
          Uzupełnij informacje o sobie
        </h3>
        <div className={BEM(cssClasses.about, cssClasses.elements)}>
          <p>Tytuł:</p>
          <input
            className={errors.title?.type === 'required' ? BEM(cssClasses.about, cssClasses.title, cssClasses.required) : BEM(cssClasses.about, cssClasses.title)}
            type="text"
            {...register("title", { required: true })}
          />
          {errors.title?.type === 'required' && <h3 className={BEM(cssClasses.about, cssClasses.text, cssClasses.required)} role="alert">Pole wymagane.</h3>}
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
          <p>Zdjęcie:</p>
          <FileUploader
            type={UploadType.Single}
            inputFile={selectedFile}
            changeInputFile={handleSelectedFile}
          />
        </div>
        <input className="submitButton" value="Zapisz" type="submit" />
      </div>
      <EditorModal
        handleClose={handleCloseEditor}
        open={openEditor}
        editorValue={richValue}
        setEditorValue={(element: any) => setRichValue(element)}
      />
      <ToastContainer toastStyle={{ backgroundColor: mainColor }} />
    </form>
  );
};
