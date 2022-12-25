import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import { mainColor } from "../../types/consts";
import { BEM } from "../../tools";
import "./style.css";

interface FileUploaderProps {
  inputFile?: File;
  changeInputFile?: (file: File) => void;
}

const FileUploader = ({ inputFile, changeInputFile }: FileUploaderProps) => {
  const cssClasses = {
    fileUploader: "fileUploader",
    container: "container",
    delete: "delete",
    image: "image",
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    changeInputFile(null);
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    changeInputFile(event.target.files[0]);
    if (event.target.files[0]) {
      setData(
        <div className={BEM(cssClasses.fileUploader, cssClasses.container)}>
          <p>Nazwa: {event.target.files[0].name}</p>
          <p>Typ: {event.target.files[0].type.replace("image/", "")}</p>
          {event.target.files[0].lastModifiedDate && (
            <p>
              Ostatnio zmieniany:{" "}
              {event.target.files[0].lastModifiedDate?.toDateString()}
            </p>
          )}
          <div className={BEM(cssClasses.image, cssClasses.container)}>
            <img
              className={BEM(cssClasses.image, cssClasses.image)}
              src={URL.createObjectURL(event.target.files[0])}
              alt="Thumb"
            />
            <button
              className={BEM(cssClasses.image, cssClasses.delete)}
              onClick={removeSelectedFile}
            >
              Usuń obraz
            </button>
          </div>
        </div>
      );
    } else {
      setData(
        <div>
          <br />
          <h4>Wybierz</h4>
        </div>
      );
    }
  };

  return (
    <>
      <Button
        sx={{
          borderRadius: "2px",
          marginTop: "1rem",
          color: mainColor,
          borderColor: mainColor,
          "&:hover": {
            backgroundColor: mainColor,
            color: "white",
            borderColor: "white",
          },
        }}
        variant="outlined"
        component="label"
        onClick={handleClick}
      >
        {selectedFile ? "Zmień" : "Dodaj"}
      </Button>
      {selectedFile && data}
      <input
        ref={hiddenFileInput}
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default FileUploader;
