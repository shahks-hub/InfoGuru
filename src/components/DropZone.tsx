// components/DropZone.tsx
import React from "react";
import styles from "./DropZone.module.css";
import UploadedFile from "@/pages/uploadpage";


interface DropZoneProps {
  data: {
    inDropZone: boolean;
    fileList: UploadedFile[];
  };
  onFileUpload: (filename: string) => void

  dispatch: React.Dispatch<any>;
  fileContent: { [key: string]: string };
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
      const existingFiles = data.fileList.map((f) => f.name);
      const newFiles = Array.from(files).filter(
        (file) => !existingFiles.includes(file.name)
      );
    
       newFiles.forEach(async(file) => {
        
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          async() => {
            
            const response = await fetch("/api/upload", {
              method: "POST",
              body: JSON.stringify({
              filename: file.name, 
              content: reader.result,
    
              })})
              if (response.ok) {
                const { filename } = await response.json();
                onFileUpload(filename);
      
               
          };
         
         
  
        }
        );
        console.log(reader.readAsDataURL(file));
    
    });

     
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
      
    </>
  );
};

export default DropZone;