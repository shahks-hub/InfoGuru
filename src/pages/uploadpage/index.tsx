import React, { useReducer, useEffect, useState } from "react";
import Head from "next/head";
import DropZone from "../../components/DropZone";
import styles from "./Home.module.css";


interface UploadedFile {
  name: string;
  // Add any other properties of the File object
}


interface StateType {
  inDropZone: boolean;
  fileList: UploadedFile[];
}

type ActionType =
  | { type: "SET_IN_DROP_ZONE"; inDropZone: boolean }
  | { type: "ADD_FILE_TO_LIST"; files: File[] };

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
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [] as File[],
  });

  const userId = "user_id_here"; // Replace with the user's ID

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
      <Head>
        <title>Drag And Drop File Upload</title>
        <meta
          name="description"
          content="Nextjs drag and drop file upload"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Drag And Drop File Upload</h1>
        <DropZone data={data} dispatch={dispatch} userId={userId} fileContent={fileContent} />
      </main>

      <footer className={styles.footer}>
        <div>{new Date().getFullYear()}</div>
      </footer>
    </div>
  );
};

export default UploadedFile;
