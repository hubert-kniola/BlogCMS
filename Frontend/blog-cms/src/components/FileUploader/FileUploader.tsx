import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

interface FileUploaderProps {
  changeInputFile?: any;
}

const FileUploader = ({ changeInputFile }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    changeInputFile(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (selectedFile) {
      return (
        <div>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <Button
      sx={{
        borderRadius: "2px",
        marginTop: "1rem",
        color: "#00eadc",
        borderColor: "#00eadc",
        '&:hover': {
          backgroundColor: '#00eadc',
          color: 'white',
          borderColor: "white",
      },
      }}
      variant="outlined"
      component="label"
      onClick={onFileUpload}
    >
      Prześlij
      <input
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={handleFileChange}
      />
    </Button>
  );
};

export default FileUploader;
