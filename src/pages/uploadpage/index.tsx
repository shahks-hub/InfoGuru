// uploadpage/index.tsx

import React, { useReducer, useEffect, useState } from "react";
import DropZone from "../../components/DropZone"; 
import styles from "./Home.module.css";
import Chatbot from 'react-chatbot-kit';

interface UploadedFile {
  name: string;
  content: string;
 
}

interface StateType {
  inDropZone: boolean;
  fileList: UploadedFile[];
}

type ActionType =
  | { type: "SET_IN_DROP_ZONE"; inDropZone: boolean }
  | { type: "ADD_FILE_TO_LIST"; files: UploadedFile[] };

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_IN_DROP_ZONE":
      return { ...state, inDropZone: action.inDropZone };
    case "ADD_FILE_TO_LIST":
      return { ...state, fileList: state.fileList.concat(action.files) };
    default:
      return state;
  }
};

const UploadedFile: React.FC = () => {
  const handleFileUpload = (filename:string) => {
    console.log(filename);
  }

  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [] as UploadedFile[],
  });

  const [fileContent, setFileContent] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchFileContent = async (fileNames: string[]) => {
      try {
        const response = await fetch("/api/getFileContent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileNames }),
        });

        if (response.ok) {
          const contentMap = await response.json();
          setFileContent(contentMap);
        } else {
          console.error("Error fetching file content:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching file content:", error);
      }
    };

    const fileNames = data.fileList.map((file) => file.name);
    if (fileNames.length > 0) {
      fetchFileContent(fileNames);
    }
  }, [data.fileList]);

  return (
    
      <div className={styles.container}>

        <main className={styles.main}>
          <h1 className={styles.title}>Drag And Drop File Upload</h1>
          <DropZone data={data} dispatch={dispatch} fileContent={fileContent} onFileUpload={handleFileUpload} />
        </main>
      </div>
    
  );
};

export default UploadedFile;
