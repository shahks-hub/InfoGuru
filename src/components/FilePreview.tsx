import React, { useEffect, useState } from "react";
import styles from "./FilePreview.module.css";
import { PrismaClient } from "@prisma/client";

interface File {
  name: string;
  // Add any other properties of the File object
}

interface FileData {
  fileList: File[];
}

interface FilePreviewProps {
  fileData: FileData;
  prisma: PrismaClient;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileData, prisma }) => {
  const [fileContent, setFileContent] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const files = await prisma.file.findMany();
        const contentMap: { [key: string]: string } = {};

        await Promise.all(
          files.map(async (file) => {
            const content = file.content;
            contentMap[file.filename] = content;
          })
        );

        setFileContent(contentMap);
      } catch (error) {
        console.error("Error fetching file content:", error);
      }
    };

    fetchFileContent();
  }, []);

  return (
    <div className={styles.fileList}>
      <div className={styles.fileContainer}>
        {fileData.fileList.map((f) => (
          <div key={f.name} className={styles.fileName}>
            {f.name}
            {fileContent[f.name] && (
              <pre>{fileContent[f.name]}</pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilePreview;
