import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteCarousel } from "../../../store/slices/configureSlice";
import { RootState } from "../../../store/store";
import { BEM } from "../../tools";
import { Carousel } from "../../types";
import { mainColor } from "../../types/consts";
import CarouselModal from "../CarouselModal/CarouselModal";
import Row from "./Rows/Row";
import "./style.css";

const CarouselTable = () => {
  const dispatch = useAppDispatch();
  const carousel = useAppSelector(
    (state: RootState) => state.configure.carousel
  );
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
      <div className={BEM(cssClasses.carouselTable, cssClasses.container)}>
        <IconButton onClick={() => setOpenCreate(true)}>
          <AddBoxIcon sx={{ color: mainColor }} />
        </IconButton>
        <Table style={{ width: "60vw" }}>
          {carousel.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Tytuł
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Treść
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Aktywność
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Data
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody sx={{ width: "fit-content" }}>
            {carousel.map((element: Carousel, i: number) => {
              return (
                <Row
                  key={i}
                  cells={[
                    element.title,
                    element.content,
                    element.active ? "Aktywny" : "Nieaktywny",
                  ]}
                  date={element.date}
                  index={i}
                  openModal={() => {
                    setOpenEdit(true);
                    setEditedIndex(i);
                  }}
                  actionOnDelete={(index: number) =>
                    dispatch(deleteCarousel({ index }))
                  }
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
