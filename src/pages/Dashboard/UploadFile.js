import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { storage } from "../Firebase";

export default function UploadFile() {
  const [pdfAsFile, setPdfAsFile] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [type, setType] = useState("");
  // type

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfAsFile(e.target.files[0]);
    }
  };

  //connection with firebase storage after click on upload button pdf pass
  function handleUpload() {
    setisLoading(true);
    const formData = new FormData();
    console.log(pdfAsFile)
    formData.append('report_file', pdfAsFile);
    console.log(formData)
    // const name = `file_${new Date().getMilliseconds()}`;
    // const uploadTask = storage.ref(name).put(pdfAsFile);
    // uploadTask.on(
    //   "state_changed",
    //   (snapShot) => {
    //     //takes a snap shot of the process as it is happening
    //     console.log(snapShot);
    //   },
    //   (err) => {
    //     setisLoading(false);
    //     alert(err);
    //   },
    //   () => {
    //     setisLoading(false);
    //     alert("File Uploaded Successfully");
    //     uploadTask.snapshot.ref
    //     .getDownloadURL()
    //     .then((url) => {
    //       const data = {
    //         name: name,
    //         url: url,
    //         type: type,
    //       };
    //       // save to db
    //     });
    //   }
    // );
    fetch(
			'https://30a712d7d785.ngrok.io/upload',
			{
				method: 'POST',
				body: formData,
        headers:{
          mode: "no-cors",
          'Access-Control-Allow-Origin':'*',
          "Content-Type": "multipart/form-data",
        }
			}
		)
			// .then((response) => response.json())
			.then((result) => {
        setisLoading(false);
				console.log('Success:', result);
			},(error) => {
        setisLoading(false);
				console.log('Error:', error);
			})
			.catch((error) => {
        setisLoading(false);
				console.error('Error:', error);
			});
  }

  return (
    <div>
      <label>
        <input
          disabled={isLoading}
          style={{ marginBottom: "15px" }}
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
