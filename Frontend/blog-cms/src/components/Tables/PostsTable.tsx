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
import { ActionType, AdminRemovePostForm, Post } from "../../types";
import { mainColor } from "../../types/consts";
import PostModal from "../PostModal/PostModal";
import Row from "./Rows/Row";
import { removeTags } from "../../tools";
import "./style.css";
import { useMutation } from "@apollo/client";
import { REMOVE_POST } from "../../apollo/apolloQueries";

const PostsTable = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.post.posts);
  const top3 = useAppSelector((state: RootState) => state.configure.top3);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editedIndex, setEditedIndex] = useState<number>(null);
  const [removePostMutation] = useMutation(REMOVE_POST);

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
                  cells={[element.title, removeTags(element.content)]}
                  date={new Date(element.publicationDate).toString().split("GMT")[0]}
                  index={i}
                  openModal={() => {
                    setOpenEdit(true);
                    setEditedIndex(i);
                  }}
                  actionOnDelete={(index: number) => {
                    dispatch(deletePost({ index }));
                    if (top3) {
                      const newTop3 = top3.filter(
                        (element) => element.title !== posts[index].title
                      );
                      dispatch(updateTop3(newTop3));
                    }
                    removePostMutation({
                      variables: {
                        id: posts[index].id,
                      } as AdminRemovePostForm,
                    });
                  }}
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
        type={ActionType.Add}
      />
      <PostModal
        handleClose={handleCloseEdit}
        index={editedIndex}
        open={openEdit}
        type={ActionType.Edit}
      />
    </>
  );
};

export default PostsTable;
