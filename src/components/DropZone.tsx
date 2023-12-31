// DropZone.tsx
import React, { useState } from "react";
import styles from "./DropZone.module.css";





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
  const [fileId, setFileId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  
  
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
    setIsLoading(true); 
    console.log("send button clicked")
    console.log("User Question:", userQuestion);
console.log("File ID:", fileId);

    if (userQuestion && fileId) {
      const response = await fetch("api/ask", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userQuestion,
          fileId
        }),
      });
  
      if (response.ok) {
        const responseText = await response.text();
        setApiResponse(responseText);
      }
      setIsLoading(false);
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
          const responseData  = await response.json();
          
         const { fileId: uploadedFileId, filename } = responseData;

          setFileId(uploadedFileId);
          onFileUpload(filename);

          // Update the upload success and progress state
          dispatch({ type: "SET_UPLOAD_SUCCESS", success: {filename } });
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

  const handleRefresh = () => {
    window.location.reload(); // This line triggers the page refresh
  };

  return (
    <div className={styles.background}>
    <main className={styles.main}>

   
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
   {/* Circular Progress Bar for API response */}
   {isLoading && (
            <div className={styles.uploadProgress}>
            
            </div>
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
    <button className={styles.refreshButton} onClick={handleRefresh}>
      Click here to upload a different file! 
      </button>
  </div>
 
)}


   

    </div>
   
    </main>
    </div>
  );
};

export default DropZone;
