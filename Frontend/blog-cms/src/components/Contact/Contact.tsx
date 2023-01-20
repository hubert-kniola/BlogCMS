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
import { AdminContactForm, ContactForm, UploadType } from "../../types";
import { UPDATE_CONTACT } from "../../apollo/apolloQueries";
import { useMutation } from "@apollo/client";
import ContactTable from "../Tables/ContactTable";

interface IFormInput {
  title: string;
  text: string;
  fieldNameOne: string;
  contentOne: string;
  fieldNameTwo: string;
  contentTwo: string;
  fieldNameThree: string;
  contentThree: string;
}

export const Contact = () => {
  const cssClasses = {
    contact: "contact",
    contactFormTable: "contactFormTable",
    container: "container",
    text: "text",
    elements: "elements",
    title: "title",
    textarea: "textarea",
    configure: "configure",
    description: "description",
  };

  const dispatch = useAppDispatch();
  const contact = useAppSelector((state: RootState) => state.contact.contact);
  const [updateContactMutation] = useMutation(UPDATE_CONTACT);
  const { register, setValue, handleSubmit } = useForm<IFormInput>();
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [richValue, setRichValue] = useState(() => EditorState.createEmpty());
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data["text"] = convertToHTML(richValue.getCurrentContent());
    dispatch(updateContact(data));
    updateContactMutation({
      variables: {
        id: contact.id,
        title: data.title,
        content: data.text,
        textBoxes: [
          { fieldName: data.fieldNameOne, content: data.contentOne },
          { fieldName: data.fieldNameTwo, content: data.contentTwo },
          { fieldName: data.fieldNameThree, content: data.contentThree },
        ],
      } as AdminContactForm,
    });
    notify();
  };

  useEffect(() => {
    const fetchData = () => {
      //TODO - implement load from redux after login fetch
      setValue("title", contact.title);
      setValue("text", contact.text);
      setValue("fieldNameOne", contact.fieldNameOne);
      setValue("contentOne", contact.contentOne);
      setValue("fieldNameTwo", contact.fieldNameTwo);
      setValue("contentTwo", contact.contentTwo);
      setValue("fieldNameThree", contact.fieldNameThree);
      setValue("contentThree", contact.contentThree);
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
    <>
      <div>
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
              <p>Nazwa pola 1:</p>
              <input
                className={BEM(cssClasses.contact, cssClasses.title)}
                type="text"
                {...register("fieldNameOne", { required: true })}
              ></input>
              <p>Wartość 1:</p>
              <input
                className={BEM(cssClasses.contact, cssClasses.title)}
                type="text"
                {...register("contentOne", { required: true })}
              ></input>
              <p>Nazwa pola 2:</p>
              <input
                className={BEM(cssClasses.contact, cssClasses.title)}
                type="text"
                {...register("fieldNameTwo", { required: true })}
              ></input>
              <p>Wartość 2:</p>
              <input
                className={BEM(cssClasses.contact, cssClasses.title)}
                type="text"
                {...register("contentTwo", { required: true })}
              ></input>
              <p>Nazwa pola 3:</p>
              <input
                className={BEM(cssClasses.contact, cssClasses.title)}
                type="text"
                {...register("fieldNameTwo", { required: true })}
              ></input>
              <p>Wartość 3:</p>
              <input
                className={BEM(cssClasses.contact, cssClasses.title)}
                type="text"
                {...register("contentTwo", { required: true })}
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
      </div>
      <div className={BEM(cssClasses.contactFormTable, cssClasses.container)}>
        <h3
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.title
          )}
        >
          Wiadomości
        </h3>
        <p
          className={BEM(
            cssClasses.configure,
            cssClasses.container,
            cssClasses.description
          )}
        >
          Sekcja służąca do wyświetlania wiadomości mailowych
        </p>
        <ContactTable />
      </div>
    </>
  );
};
