import Button from "@mui/material/Button";
import { convertToHTML } from "draft-convert";
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
import { UploadType } from "../../types";

interface IFormInput {
  title: string;
  text: string;
  mail: string;
  phone: string;
  insta: string;
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
  const [richValue, setRichValue] = useState(() => EditorState.createEmpty());
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    //data["file"] = selectedFile;
    data["text"] = convertToHTML(richValue.getCurrentContent());
    dispatch(updateContact(data));
    notify();
  };

  useEffect(() => {
    const fetchData = () => {
      //TODO - implement load from redux after login fetch
      setValue("title", contact.title);
      setValue("mail", contact.mail);
      setValue("phone", contact.phone);
      setValue("insta", contact.insta);
      //contact.file && setSelectedFile(contact.file);
      contact.text && setRichValue(ConvertFromHtmlToEditorState(contact.text));
    };

    fetchData();
  }, []);

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const handleSelectedFile = (e: File) => {
    //setSelectedFile(e);
  };

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
          <p>E-mail:</p>
          <input
            className={BEM(cssClasses.contact, cssClasses.title)}
            type="text"
            {...register("mail", { required: true })}
          ></input>
          <p>Telefon:</p>
          <input
            className={BEM(cssClasses.contact, cssClasses.title)}
            type="text"
            {...register("phone", { required: true })}
          ></input>
          <p>Instagram:</p>
          <input
            className={BEM(cssClasses.contact, cssClasses.title)}
            type="text"
            {...register("insta", { required: true })}
          ></input>
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
