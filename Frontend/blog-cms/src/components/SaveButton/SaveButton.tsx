import Button from "@mui/material/Button";
import React from "react";
import { mainColor } from "../../types/consts";
import "./style.css";

interface SaveButtonProps {
  handleSave: () => void;
  text?: string;
  disable?: boolean;
}

const SaveButton = ({handleSave, text, disable}: SaveButtonProps) => {
  return (
    <Button
      sx={{
        borderRadius: "2px",
        marginTop: "1rem",
        marginRight: "1rem",
        color: mainColor,
        borderColor: mainColor,
        width: "10rem",
        "&:hover": {
          backgroundColor: mainColor,
          color: "white",
          borderColor: "white",
        },
      }}
      variant="outlined"
      component="label"
      onClick={handleSave}
      disabled={disable ? disable : false}
    >
      {text ? text : "Zapisz"}
    </Button>
  );
};

export default SaveButton;