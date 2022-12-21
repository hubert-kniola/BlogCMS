import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deletePost } from "../../../store/slices/postSlice";
import { RootState } from "../../../store/store";
import { BEM } from "../../tools";
import { Post } from "../../types";
import { mainColor } from "../../types/consts";
import PostModal from "../PostModal/PostModal";
import Row from "./Rows/Row";
import "./style.css";

const PostsTable = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.post.posts);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editedIndex, setEditedIndex] = useState<number>(null);

  const cssClasses = {
    postTable: "postTable",
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
      <div className={BEM(cssClasses.postTable, cssClasses.container)}>
        <IconButton onClick={() => setOpenCreate(true)}>
          <AddBoxIcon sx={{ color: mainColor }} />
        </IconButton>
        <Table style={{ width: "60vw" }}>
          {posts.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Tytuł
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Treść
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Data
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody sx={{ width: "fit-content" }}>
            {posts.map((element: Post, i: number) => {
              return (
                <Row
                  key={i}
                  cells={[element.title, element.content]}
                  date={element.date}
                  index={i}
                  openModal={() => {
                    setOpenEdit(true);
                    setEditedIndex(i);
                  }}
                  actionOnDelete={(index: number) =>
                    dispatch(deletePost({ index }))
                  }
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
      <PostModal
        handleClose={handleCloseCreate}
        index={editedIndex}
        open={openCreate}
        type="add"
      />
      <PostModal
        handleClose={handleCloseEdit}
        index={editedIndex}
        open={openEdit}
        type="edit"
      />
    </>
  );
};

export default PostsTable;
