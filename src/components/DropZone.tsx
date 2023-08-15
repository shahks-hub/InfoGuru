import React from "react";
import Image from "next/image";
import FilePreview from "./FilePreview";
import styles from "./DropZone.module.css";
import { PrismaClient } from "@prisma/client";

interface DropZoneProps {
  data: {
    inDropZone: boolean;
    fileList: File[];
  };
  dispatch: React.Dispatch<any>;
  userId: string;
  prisma: PrismaClient;
}

const DropZone: React.FC<DropZoneProps> = ({
  data,
  dispatch,
  userId,
  prisma,
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

      try {
        await Promise.all(
          newFiles.map(async (file) => {
            const content = await file.text();
            await prisma.file.create({
              data: {
                filename: file.name,
                content,
                ownerId: userId,
              },




            });
          })
        );

        dispatch({ type: "ADD_FILE_TO_LIST", files: newFiles });
        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
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
      <FilePreview fileData={data} prisma={prisma} />
    </>
  );
};

export default DropZone;
