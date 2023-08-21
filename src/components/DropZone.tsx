// DropZone.tsx
import React, { useState } from "react";
import styles from "./DropZone.module.css";
import Link from 'next/link';
import { Configuration, OpenAIApi } from "openai";

interface DropZoneProps {
  data: {
    inDropZone: boolean;
    uploadProgress: number;
    uploadSuccess: { filename: string } | null;
  };
  dispatch: React.Dispatch<any>;
  onFileUpload: (filename: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ data, dispatch, onFileUpload }) => {
  const [userQuestion, setUserQuestion] = useState("");
  const [apiResponse, setApiResponse] = useState<string>("");
  
  
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


  
 

  const handleSendQuestion = async () => {
    if (userQuestion) {
      const apiKey = ""; //add your own apikey here
      const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages:[ {
       role:'user',
       content: userQuestion }]
});
  console.log(response);
if(response ){
  const responseText = response.data.choices[0].message?.content;
  setApiResponse(responseText || "");

}
      
    }
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

          // Update the upload success and progress state
          dispatch({ type: "SET_UPLOAD_SUCCESS", success: { filename } });
          dispatch({ type: "SET_UPLOAD_PROGRESS", progress: 100 });
        }
      });

      reader.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          dispatch({ type: "SET_UPLOAD_PROGRESS", progress });
        }
      });

      reader.readAsDataURL(file);
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
      
      <h3 className={styles.uploadMessage}> drag &amp; drop your file here</h3>
  

       {/* Circular Progress Bar */}
    {data.uploadProgress > 0 && data.uploadProgress < 100 && (
      <div className={styles.uploadProgress} style={{ transform: `rotate(${(data.uploadProgress / 100) * 360}deg)` }} />
    )}


{data.uploadSuccess && (
  <div className={styles.uploadSuccess}>
    File uploaded successfully: {data.uploadSuccess.filename}
    
    <label>Enter your question here:</label>
    <input 
    type="text"
     placeholder="what info does the file have?"
     value={userQuestion || ""}
     onChange={(e) => setUserQuestion(e.target.value)}
    
    />
    <button className={styles.btnsend} onClick={handleSendQuestion} >send question</button>
    {apiResponse && <div className={styles.apiResponse}>{apiResponse}</div>} 
   
  </div>
 
)}


    <Link href= "/homepage">
    <button className={styles.logoutbtn}>Logout</button>
    </Link>
 


    </div>
   
  );
};

export default DropZone;
