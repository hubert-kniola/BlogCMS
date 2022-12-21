import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { BEM } from "../../tools";
import "./style.css";
import { mainColor } from "../../types/consts";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

interface EditorModalProps {
  handleClose: () => void;
  open: boolean;
  editorValue: any;
  setEditorValue: (value: any) => void;
}

const EditorModal = ({
  handleClose,
  open,
  editorValue,
  setEditorValue,
}: EditorModalProps) => {
  const cssClasses = {
    editorModal: "editorModal",
    editor: "editor",
    container: "container",
    close: "close",
    title: "title",
    elements: "elements",
    text: "text",
  };

  const closeIcon = (
    <IconButton onClick={handleClose}>
      <CloseIcon sx={{ color: mainColor }} />
    </IconButton>
  );

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
          <div className={BEM(cssClasses.editorModal, cssClasses.container)}>
            <div className={BEM(cssClasses.editorModal, cssClasses.close)}>
              {closeIcon}
            </div>
            <h3
              className={BEM(
                cssClasses.editorModal,
                cssClasses.container,
                cssClasses.text
              )}
            >
              Modyfikuj treść
            </h3>
            <div className={BEM(cssClasses.editorModal, cssClasses.elements)}>
              <div className={BEM(cssClasses.editor, cssClasses.container)}>
                <Editor
                  editorState={editorValue}
                  onEditorStateChange={setEditorValue}
                />
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditorModal;
