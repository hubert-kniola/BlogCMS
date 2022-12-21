import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { BEM } from "../../../tools";
import { mainColor } from "../../../types/consts";
import "./style.css";

interface RowProps {
  cells: string[];
  date?: string;
  index: number;
  openModal?: () => void;
  actionOnDelete?: (index: number) => void;
}

const Row = ({ index, cells, date, openModal, actionOnDelete }: RowProps) => {
  const dispatch = useAppDispatch();

  const cssClasses = {
    row: "row",
    title: "title",
    content: "content",
  };

  const deleteIcon = (
    <IconButton onClick={() => actionOnDelete(index)}>
      <DeleteIcon sx={{ color: mainColor }} />
    </IconButton>
  );

  const editIcon = (
    <IconButton onClick={openModal}>
      <EditIcon color="action" />
    </IconButton>
  );

  return (
    <TableRow key={index}>
      {cells.map((element) => {
        return (
          <TableCell>
            <div className={BEM(cssClasses.row, cssClasses.content)}>
              {element}
            </div>
          </TableCell>
        );
      })}
      {date && <TableCell>{date}</TableCell>}
      <TableCell component="th" scope="row">
        {editIcon}
        {deleteIcon}
      </TableCell>
    </TableRow>
  );
};

export default Row;
