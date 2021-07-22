import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { storage } from "../Firebase";

export default function UploadFile() {
  const [pdfAsFile, setPdfAsFile] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfAsFile(e.target.files[0]);
    }
  };

  //connection with firebase storage after click on upload button pdf pass
  const handleUpload = () => {
    setisLoading(true);
    const uploadTask = storage
      .ref(`file_${new Date().getMilliseconds()}`)
      .put(pdfAsFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        setisLoading(false);
        alert(err);
      },
      () => {
        setisLoading(false);
        alert("File Uploaded Successfully");
        // uploadTask.snapshot.ref
        //   .getDownloadURL()
        //   .then(url => {
        //     setUrl(url);
        //  })
      }
    );
  };

  return (
    <div>
      <label>
        <input
          disabled={isLoading}
          style={{ marginBottom: '15px' }}
          type="file"
          accept=".pdf"
          onChange={handleChange}
        />
      </label>
      <div style={{ marginRight: "200px" }}>
        <Button
          disabled={isLoading}
          component="span"
          style={{
            width: "250px",
            height: "50px",
            background: "#3254CB",
            boxShadow: "4px 4px 8px #B7C7FF",
            borderRadius: "10px",
            color: "#FFFFFF",
          }}
          onClick={handleUpload}
        >
          {isLoading ? (
            <>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <CloudUploadIcon
                style={{ marginRight: "10px", marginTop: "5px" }}
              />
              <span>UPLOAD</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
