import Button from "@mui/material/Button";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUploader from "../FileUploader/FileUploader";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateContact } from "../../../store/slices/contactSlice";
import { RootState } from "../../../store/store";
import { BEM, ConvertFromHtmlToEditorState } from "../../tools";
import { mainColor } from "../../types/consts";
import EditorModal from "../EditorModal/EditorModal";
import "./style.css";

interface IFormInput {
  title: string;
  text: string;
  file: any;
}

interface IFormInput {
  title: string;
  text: string;
  file: any;
}

export const Contact = () => {
  const cssClasses = {
    contact: "contact",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    textarea: "textarea",
  };

  const dispatch = useAppDispatch();
  const contact = useAppSelector((state: RootState) => state.contact);
  const { register, setValue, handleSubmit } = useForm<IFormInput>();
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [richValue, setRichValue] = useState(() => EditorState.createEmpty());
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data["file"] = null;
    dispatch(updateContact(data));
    notify();
  };

  useEffect(() => {
    const fetchData = () => {
      //TODO - implement load from redux after login fetch
      setValue("title", contact.title);
      contact.text && setRichValue(ConvertFromHtmlToEditorState(contact.text));
    };

    fetchData();
  });

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const handleSelectedFile = (e: File) => {
    setSelectedFile(e);
  }

  const notify = () => {
    toast.success(" Zapisano", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={BEM(cssClasses.contact, cssClasses.container)}>
        {" "}
        <h3
          className={BEM(
            cssClasses.contact,
            cssClasses.container,
            cssClasses.text
          )}
        >
          Uzupełnij informacje kontaktowe
        </h3>
        <div className={BEM(cssClasses.contact, cssClasses.elements)}>
          <p>Tytuł:</p>
          <input
            className={BEM(cssClasses.contact, cssClasses.title)}
            type="text"
            {...register("title", { required: true })}
          ></input>
          <p>Treść:</p>
          <Button
            sx={{
              borderRadius: "2px",
              marginTop: "1rem",
              color: mainColor,
              borderColor: mainColor,
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
          <FileUploader inputFile={selectedFile} changeInputFile={handleSelectedFile}/>
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