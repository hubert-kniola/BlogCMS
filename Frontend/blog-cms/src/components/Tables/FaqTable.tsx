import { useMutation } from "@apollo/client";
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
import { deleteFaq } from "../../../store/slices/configureSlice";
import { RootState } from "../../../store/store";
import { REMOVE_FAQ_ELEMENT } from "../../apollo/apolloQueries";
import { BEM } from "../../tools";
import { ActionType, AdminRemoveFaqForm, FAQ } from "../../types";
import { mainColor } from "../../types/consts";
import FaqModal from "../FaqModal/FaqModal";
import Row from "./Rows/Row";
import "./style.css";

const FaqTable = () => {
  const dispatch = useAppDispatch();
  const faqs = useAppSelector((state: RootState) => state.configure.faq);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editedIndex, setEditedIndex] = useState<number>(null);
  const [removeFaqMutation] = useMutation(REMOVE_FAQ_ELEMENT);

  const cssClasses = {
    faqTable: "faqTable",
    container: "container",
    dropdown: "dropdown",
    item: "item",
    add: "add",
    edit: "edit",
    label: "label",
    date: "date",
  };

  useEffect(() => {
    const fetchData = () => {
      //TODO - implement load from redux after login fetch
    };

    fetchData();
  }, []);

  const handleCloseCreate = () => setOpenCreate(false);

  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <>
      <div className={BEM(cssClasses.faqTable, cssClasses.container)}>
        <IconButton onClick={() => setOpenCreate(true)}>
          <AddBoxIcon sx={{ color: mainColor }} />
        </IconButton>
        <Table style={{ width: "60vw" }}>
          {faqs.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Pytanie
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Odpowiedź
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody sx={{ width: "fit-content" }}>
            {faqs.map((element: FAQ, i: number) => {
              return (
                <Row
                  key={i}
                  cells={[element.question, element.answer]}
                  date={null}
                  index={i}
                  openModal={() => {
                    setOpenEdit(true);
                    setEditedIndex(i);
                  }}
                  actionOnDelete={(index: number) => {
                    dispatch(deleteFaq({ index }));
                    removeFaqMutation({
                      variables: {
                        id: faqs[index].id,
                      } as AdminRemoveFaqForm,
                    });
                  }}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
      <FaqModal
        handleClose={handleCloseCreate}
        index={editedIndex}
        open={openCreate}
        type={ActionType.Add}
      />
      <FaqModal
        handleClose={handleCloseEdit}
        index={editedIndex}
        open={openEdit}
        type={ActionType.Edit}
      />
    </>
  );
};

export default FaqTable;
