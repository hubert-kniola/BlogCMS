import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React from "react";
import ContactForm from "../ContactForm/ContactForm";
import "./style.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

interface ContactModalProps {
  handleClose: () => void;
  open: boolean;
  type: string;
  index: number;
}

const ContactModal = ({
  handleClose,
  open,
  type,
  index,
}: ContactModalProps) => {
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
          <ContactForm handleClose={handleClose} index={index} type={type} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ContactModal;
