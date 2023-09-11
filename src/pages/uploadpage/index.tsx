// UploadPage.tsx
import React, { useReducer } from "react";
import DropZone from "../../components/DropZone";
import styles from "./Home.module.css";
import Link from 'next/link';

interface StateType {
  inDropZone: boolean;
  uploadProgress: number;
  uploadSuccess: { filename: string } | null;
}

type ActionType =
  | { type: "SET_IN_DROP_ZONE"; inDropZone: boolean }
  | { type: "SET_UPLOAD_PROGRESS"; progress: number }
  | { type: "SET_UPLOAD_SUCCESS"; success: { filename: string } | null };

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_IN_DROP_ZONE":
      return { ...state, inDropZone: action.inDropZone };
    case "SET_UPLOAD_PROGRESS":
      return { ...state, uploadProgress: action.progress };
    case "SET_UPLOAD_SUCCESS":
      return { ...state, uploadSuccess: action.success };
    default:
      return state;
  }
};

const UploadPage: React.FC = () => {
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    uploadProgress: 0,
    uploadSuccess: null,
  });

  const handleFileUpload = (filename: string) => {
    console.log(filename);
  };

  return (
   
    <div className={styles.pageWrapper}>
      <main className={styles.main}>
        <div className={styles.tot}>
          <title>DashBoard</title>  
          <div className={styles.dash}>
            <h1 className={styles.title}>Drag And Drop File Upload</h1>
            <DropZone data={data} dispatch={dispatch} onFileUpload={handleFileUpload} />
          </div>
        </div>
      </main>
    
      <Link href= "/homepage">
        <button className={styles.logoutbtn}>Logout</button>
      </Link>
    </div>
  
  );
};
export default UploadPage;
