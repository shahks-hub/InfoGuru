import React, { useEffect, useState } from "react";
import styles from "./FilePreview.module.css";

interface File {
  name: string;
  // Add any other properties of the File object
}

interface FileData {
  fileList: File[];
}

interface FilePreviewProps {
  fileData: FileData;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileData }) => {
  const [fileContent, setFileContent] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch("/api/getFilecontent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileNames: fileData.fileList.map((f) => f.name) }),
        });

        if (response.ok) {
          const contentMap: { [key: string]: string } = await response.json();
          setFileContent(contentMap);
        } else {
          console.error("Error fetching file content:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching file content:", error);
      }
    };

    fetchFileContent();
  }, [fileData]);

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
