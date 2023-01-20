import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deletePost } from "../../../store/slices/postSlice";
import { updateTop3 } from "../../../store/slices/configureSlice";
import { RootState } from "../../../store/store";
import { BEM } from "../../tools";
import { ActionType, AdminRemoveContactForm, AdminRemovePostForm, ContactForm, Post } from "../../types";
import { mainColor } from "../../types/consts";
import ContactModal from "../ContactModal/ContactModal";
import Row from "./Rows/Row";
import { removeTags } from "../../tools";
import "./style.css";
import { useMutation } from "@apollo/client";
import { REMOVE_CONTACT_FORM_ELEMENT, REMOVE_POST } from "../../apollo/apolloQueries";
import { deleteContactForm } from "../../../store/slices/contactSlice";

const ContactTable = () => {
  const dispatch = useAppDispatch();
  const contactForms = useAppSelector((state: RootState) => state.contact.forms);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editedIndex, setEditedIndex] = useState<number>(null);
  const [removeContactFormMutation] = useMutation(REMOVE_CONTACT_FORM_ELEMENT);

  const cssClasses = {
    contactTable: "contactTable",
    container: "container",
    dropdown: "dropdown",
    item: "item",
    add: "add",
    edit: "edit",
    label: "label",
    date: "date",
  };

  const handleCloseCreate = () => setOpenCreate(false);

  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <>
      <div className={BEM(cssClasses.contactTable, cssClasses.container)}>
        <Table style={{ width: "60vw" }}>
          {contactForms.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Imię i nazwisko
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Treść
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody sx={{ width: "fit-content" }}>
            {contactForms.map((element: ContactForm, i: number) => {
              return (
                <Row
                  key={i}
                  cells={[element.name, element.email, element.content]}
                  index={i}
                  openModal={() => {
                    setOpenEdit(true);
                    setEditedIndex(i);
                  }}
                  actionOnDelete={(index: number) => {
                    dispatch(deleteContactForm({ index }));
                    removeContactFormMutation({
                      variables: {
                        id: contactForms[index].id,
                      } as AdminRemoveContactForm,
                    });
                  }}
                  onlyView={true}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
      <ContactModal
        handleClose={handleCloseEdit}
        index={editedIndex}
        open={openEdit}
        type={ActionType.Edit}
      />
    </>
  );
};

export default ContactTable;
