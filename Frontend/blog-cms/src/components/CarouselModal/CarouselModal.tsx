import React, { useEffect, useMemo, useRef, useState } from "react";
import PostForm from "../PostForm/PostForm";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CarouselForm from "../CarouselForm/CarouselForm";
import "./style.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

interface CarouselModalProps {
    handleClose: () => void;
    open: boolean;
    type: string;
    index: number;
}

const CarouselModal = ({handleClose, open, type, index}: CarouselModalProps) => {
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
          <CarouselForm handleClose={handleClose} index={index} type={type}/>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CarouselModal;
