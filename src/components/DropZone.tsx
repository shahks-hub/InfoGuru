

import React from "react";
import styles from "./DropZone.module.css";

interface DropZoneProps {
  data: {
    inDropZone: boolean;
  };
  dispatch: React.Dispatch<any>;
  onFileUpload: (filename: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ data, dispatch, onFileUpload }) => {
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
      const file = files[0]; // Assuming only one file is dropped
      
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({
            filename: file.name,
            content: reader.result,
          }),
        });

        if (response.ok) {
          const { filename } = await response.json();
          onFileUpload(filename);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0]; // Assuming only one file is selected

      dispatch({ type: "ADD_FILE_TO_LIST", files: [{ name: file.name }] });
    }
  };

  return (
    <div
      className={`${styles.dropzone} ${
        data.inDropZone ? styles.active : ""
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id="fileSelect"
        type="file"
        className={styles.files}
        onChange={handleFileSelect}
      />
      <label htmlFor="fileSelect">Select a File</label>
      <h3 className={styles.uploadMessage}>or drag &amp; drop your file here</h3>
    </div>
  );
};

export default DropZone;
