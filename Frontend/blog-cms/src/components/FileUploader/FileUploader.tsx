import Button from "@mui/material/Button";
import React, { useRef, useState } from "react";
import { BEM } from "../../tools";
import { UploadType } from "../../types";
import { mainColor } from "../../types/consts";
import "./style.css";

interface FileUploaderProps {
  inputFile?: any;
  changeInputFile?: (files: any) => void;
  type: UploadType;
  count?: number;
}

const FileUploader = ({
  inputFile,
  changeInputFile,
  type,
  count,
}: FileUploaderProps) => {
  const cssClasses = {
    fileUploader: "fileUploader",
    container: "container",
    delete: "delete",
    image: "image",
    multi: "multi",
  };

  const sizeErrors = ["Możesz wstawić tylko 1 plik", "Wybrałeś za dużo plików"];

  const [selectedFiles, setSelectedFiles] = useState<File[]>(null);
  const [error, setError] = useState<string>(null);
  const [data, setData] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };

  const removeSelectedFile = () => {
    setSelectedFiles(null);
    changeInputFile(null);
  };

  const handleFileChange = (event: any) => {
    let isError = true;
    if (type === UploadType.Multi && event.target.files.length >= 1) {
      isError = false;
      setSelectedFiles(event.target.files);
      changeInputFile(event.target.files);
    } else if (event.target.files.length === 1) {
      isError = false;
      setSelectedFiles(event.target.files[0]);
      changeInputFile(event.target.files[0]);
    }

    if (
      (type === UploadType.Single ||
        (type === UploadType.Multi && event.target.files.length === 1)) &&
      !isError
    ) {
      setData(
        <div className={BEM(cssClasses.fileUploader, cssClasses.container)}>
          <p>Dodano plik: {event.target.files[0].name}</p>
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
        <div className={BEM(cssClasses.fileUploader, cssClasses.container)}>
          <p>Dodano pliki:</p>
          {event.target.files &&
            Array.from(event.target.files).map(
              (element: File, index: number) => {
                return (
                  <p>
                    {index}. 
                    {element.name}
                  </p>
                );
              }
            )}
          <div className={BEM(cssClasses.image, cssClasses.container)}>
            <div
              className={BEM(
                cssClasses.image,
                cssClasses.container,
                cssClasses.multi
              )}
            >
              {event.target.files &&
                Array.from(event.target.files).map((element: File) => {
                  return (
                    <img
                      className={BEM(
                        cssClasses.image,
                        cssClasses.image,
                        cssClasses.multi
                      )}
                      src={URL.createObjectURL(element)}
                      alt="Thumb"
                    />
                  );
                })}
            </div>
          </div>
          <button
            className={BEM(cssClasses.image, cssClasses.delete)}
            onClick={removeSelectedFile}
          >
            Usuń obrazy
          </button>
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
        {selectedFiles ? "Zmień" : "Dodaj"}
      </Button>
      {selectedFiles && data}
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
