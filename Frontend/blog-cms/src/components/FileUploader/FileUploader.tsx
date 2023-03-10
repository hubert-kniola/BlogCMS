import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
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

  const checkURL = (element: any): boolean => {
    if (typeof element === "string" && element.includes("http")) {
      return true;
    } else if (
      Array.isArray(element) &&
      typeof element[0] === "string" &&
      element[0].includes("http")
    ) {
      return true;
    }
    return false;
  };

  const singleData = (event?: any) => {
    return (
      <div className={BEM(cssClasses.fileUploader, cssClasses.container)}>
        {inputFile ? (
          (inputFile.name && !inputFile.name.includes("_")) ? (
            <p>Dodano plik: {inputFile.name}</p>
          ) : null
        ) : (
          <p>Dodano plik: {event.target.files[0].name}</p>
        )}
        <div className={BEM(cssClasses.image, cssClasses.container)}>
          <img
            className={BEM(cssClasses.image, cssClasses.image)}
            src={
              checkURL(inputFile)
                ? inputFile
                : URL.createObjectURL(
                    inputFile ? inputFile : event.target.files[0]
                  )
            }
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
  };

  const multiData = (event?: any) => {
    return (
      <div className={BEM(cssClasses.fileUploader, cssClasses.container)}>
        {/* {inputFile && inputFile[0].name ? <p>Dodano pliki:</p> : null} */}
        {/* {inputFile
          ? inputFile[0].name
            ? Array.from(inputFile).map((element: File, index: number) => {
                return (
                  <p>
                    {index}.{element.name}
                  </p>
                );
              })
            : null
          : event.target.files &&
            Array.from(event.target.files).map(
              (element: File, index: number) => {
                return (
                  <p>
                    {index}.{element.name}
                  </p>
                );
              }
            )} */}
        <div className={BEM(cssClasses.image, cssClasses.container)}>
          <div
            className={BEM(
              cssClasses.image,
              cssClasses.container,
              cssClasses.multi
            )}
          >
            {inputFile
              ? Array.from(inputFile).map((element: any) => {
                  return (
                    <img
                      className={BEM(
                        cssClasses.image,
                        cssClasses.image,
                        cssClasses.multi
                      )}
                      src={
                        checkURL(element)
                          ? element
                          : URL.createObjectURL(element)
                      }
                      alt="Thumb"
                    />
                  );
                })
              : event.target.files &&
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
  };

  const handleFileSet = (event: any) => {
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
      setData(singleData(event));
    } else {
      setData(multiData(event));
    }
  };

  const handleFileEdit = () => {
    const isArray: boolean = Array.isArray(inputFile);
    if (isArray || typeof inputFile === "object") {
      if (isArray  || Object.keys(inputFile).length > 1) {
        return multiData();
      } else {
        return singleData();
      }
    } else {
      return singleData();
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
          width: "10vw",
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
        {inputFile ? "Zmień" : selectedFiles ? "Zmień" : "Dodaj"}
      </Button>
      {inputFile ? handleFileEdit() : selectedFiles && data}
      <input
        ref={hiddenFileInput}
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={handleFileSet}
        style={{ display: "none" }}
      />
    </>
  );
};

export default FileUploader;
