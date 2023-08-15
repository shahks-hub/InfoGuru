import React, { useReducer } from "react";
import Head from "next/head";
import DropZone from "../../components/DropZone";
import styles from "./Home.module.css";
import { PrismaClient } from "@prisma/client";

// Define the types for state and action
interface StateType {
  inDropZone: boolean;
  fileList: File[];
}

type ActionType =
  | { type: "SET_IN_DROP_ZONE"; inDropZone: boolean }
  | { type: "ADD_FILE_TO_LIST"; files: File[] };

// Define the reducer function
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
const prisma = new PrismaClient();
const Home: React.FC = () => {
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [] as File[],
  });

  const userId = "user_id_here"; // Replace with the user's ID

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
        <DropZone data={data} dispatch={dispatch} userId={userId} prisma={prisma} />
      </main>

      <footer className={styles.footer}>
        <div>{new Date().getFullYear()}</div>
      </footer>
    </div>
  );
};

export default Home;
