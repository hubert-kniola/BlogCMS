import React, { useEffect, useMemo, useRef, useState } from "react";
import { BEM } from "../../tools";
import Button from "@mui/material/Button";
import "./style.css";

interface SaveButtonProps {
  handleSave: () => void;
}

export const SaveButton = ({handleSave}: SaveButtonProps) => {
  return (
    <Button
      sx={{
        borderRadius: "2px",
        marginTop: "1rem",
        marginRight: "1rem",
        color: "#00eadc",
        borderColor: "#00eadc",
        width: "10rem",
        "&:hover": {
          backgroundColor: "#00eadc",
          color: "white",
          borderColor: "white",
        },
      }}
      variant="outlined"
      component="label"
      onClick={handleSave}
    >
      Zapisz
    </Button>
  );
};