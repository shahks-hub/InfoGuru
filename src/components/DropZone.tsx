import React from "react";
import FilePreview from "./FilePreview";
import styles from "./DropZone.module.css";
import UploadedFile from "../pages/uploadpage";

interface DropZoneProps {
  data: {
    inDropZone: boolean;
    fileList: UploadedFile[];
  };
  dispatch: React.Dispatch<any>;
  userId: string;
 fileContent: {[key:string]:string};
  
}

const DropZone: React.FC<DropZoneProps> = ({
  data,
  dispatch,
  userId,
  
}) => {
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
      const existingFiles = data.fileList.map((f) => f.name);
      const newFiles = Array.from(files).filter(
        (file) => !existingFiles.includes(file.name)
      );

      const formData = new FormData();
      newFiles.forEach((file) => {
        formData.append("files", file);
        formData.append("content",file);
      });

      try {
        // Make a POST request to the API endpoint
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const { uploadedFiles } = await response.json();

          dispatch({
            type: "ADD_FILE_TO_LIST",
            files: uploadedFiles.map((file: any) => ({
              name: file.filename,
            })),
          });

          dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
        } else {
          console.error("Error uploading files:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      const newFiles = Array.from(files).filter(
        (file) => !existingFiles.includes(file.name)
      );

      dispatch({ type: "ADD_FILE_TO_LIST", files: newFiles });
    }
  };

  return (
    <>
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
          multiple
          className={styles.files}
          onChange={handleFileSelect}
        />
        <label htmlFor="fileSelect">You can select multiple Files</label>
        <h3 className={styles.uploadMessage}>or drag &amp; drop your files here</h3>
      </div>
      <FilePreview fileData={data}/>
    </>
  );
};

export default DropZone;
