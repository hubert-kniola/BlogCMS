import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React from "react";
import PostForm from "../PostForm/PostForm";
import "./style.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

interface PostModalProps {
    handleClose: () => void;
    open: boolean;
    type: string;
    index: number;
}

const PostModal = ({handleClose, open, type, index}: PostModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <PostForm handleClose={handleClose} index={index} type={type}/>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PostModal;
