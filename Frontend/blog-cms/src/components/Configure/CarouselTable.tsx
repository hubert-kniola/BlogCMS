import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import { BEM } from "../../tools";
import { TableBody, Table } from "@mui/material";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import {
  addPost,
  updatePost,
  deletePost,
} from "../../../store/slices/postSlice";
import Row from "../Table/Row"
import PostForm from "../PostForm/PostForm";
import PostModal from "../PostModal/PostModal";
import { Post } from "../../types";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { deleteCarousel } from "../../../store/slices/configureSlice";
import CarouselModal from "../CarouselModal/CarouselModal";

const CarouselTable = () => {
  const dispatch = useAppDispatch();
  const carousel = useAppSelector((state: RootState) => state.configure.carousel);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editedIndex, setEditedIndex] = useState<number>(null);

  const cssClasses = {
    carouselTable: "carouselTable",
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
      <div className={BEM(cssClasses.carouselTable, cssClasses.container)}>
        <IconButton onClick={() => setOpenCreate(true)}>
          <AddBoxIcon sx={{ color: "#00eadc" }} />
        </IconButton>
        <Table style={{ width: "60vw" }}>
          <TableBody sx={{ width: "fit-content" }}>
            {carousel.map((element: Post, i: number) => {
              return (
                <Row
                  key={i}
                  element={element}
                  index={i}
                  openModal={() => {
                    setOpenEdit(true);
                    setEditedIndex(i);
                  }}
                  actionOnDelete={(index: number) => dispatch(deleteCarousel(index))}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
      <CarouselModal
        handleClose={handleCloseCreate}
        index={editedIndex}
        open={openCreate}
        type="add"
      />
      <CarouselModal
        handleClose={handleCloseEdit}
        index={editedIndex}
        open={openEdit}
        type="edit"
      />
    </>
  );
};

export default CarouselTable;
