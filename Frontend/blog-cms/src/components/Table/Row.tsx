import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import { BEM } from "../../tools";
import "./style.css";
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Post } from "../../types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deletePost, updatePost } from "../../../store/slices/postSlice";

interface RowProps {
  element: any;
  index: number;
  openModal?: () => void;
  actionOnDelete?: (index: number) => void;
}

const Row = ({ index, element, openModal, actionOnDelete }: RowProps) => {
  const dispatch = useAppDispatch();

  const cssClasses = {
    postRow: "postRow",
    title: "title",
    content: "content",
  };

  const deleteIcon = (
    <IconButton onClick={() => actionOnDelete(index)}>
      <DeleteIcon sx={{ color: "#00eadc" }} />
    </IconButton>
  );

  const editIcon = (
    <IconButton onClick={openModal}>
      <EditIcon color="action" />
    </IconButton>
  );

  return (
    <TableRow key={index}>
      <TableCell>
        <div className={BEM(cssClasses.postRow, cssClasses.content)}>
          {element.title}
        </div>
      </TableCell>
      <TableCell>
        <div className={BEM(cssClasses.postRow, cssClasses.content)}>
          {element.content}
        </div>
      </TableCell>
      <TableCell>{element.date ? element.date : null}</TableCell>
      <TableCell component="th" scope="row">
        {editIcon}
        {deleteIcon}
      </TableCell>
    </TableRow>
  );
};

export default Row;
