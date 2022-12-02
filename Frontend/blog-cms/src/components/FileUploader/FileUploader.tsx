import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";

interface FileUploaderProps {
  changeInputFile?: () => void;
}

const FileUploader = ({ changeInputFile }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (event: any) => {
    //changeInputFile(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    if (event.target.files[0]) {
      setData(
        <div>
          <p>Nazwa: {event.target.files[0].name}</p>
          <p>Typ: {event.target.files[0].type.replace("image/", "")}</p>
          {event.target.files[0].lastModifiedDate && (
            <p>
              Ostatnio zmieniany:{" "}
              {event.target.files[0].lastModifiedDate?.toDateString()}
            </p>
          )}
        </div>
      );
    } else {
      setData(
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  const onFileUpload = () => {
    if (selectedFile) {
      return (
        <div>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type.replace("image/", "")}</p>
          {selectedFile.lastModifiedDate && (
            <p>
              Last Modified: {selectedFile.lastModifiedDate?.toDateString()}
            </p>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h4>Dodaj zdjęcie do swojego posta! To pomaga w odbiorze</h4>
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
          color: "#00eadc",
          borderColor: "#00eadc",
          "&:hover": {
            backgroundColor: "#00eadc",
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
