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
import Row from "../Table/Row";
import PostForm from "../PostForm/PostForm";
import PostModal from "../PostModal/PostModal";
import { Post } from "../../types";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

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
          <AddBoxIcon sx={{ color: "#00eadc" }} />
        </IconButton>
        <Table style={{ width: "60vw" }}>
          <TableBody sx={{ width: "fit-content" }}>
            {posts.map((element: Post, i: number) => {
              return (
                <Row
                  key={i}
                  element={element}
                  index={i}
                  openModal={() => {
                    setOpenEdit(true);
                    setEditedIndex(i);
                  }}
                  actionOnDelete={(index: number) => dispatch(deletePost({index}))}
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
