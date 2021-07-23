import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { database } from "../Firebase";
import TableContent from "./TableContent";

export default function UploadFile(props) {
  const {setEditDetailData} = props;
  const [pdfAsFile, setPdfAsFile] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [type, setType] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const databaseRef = database.ref("/");

  useEffect(() => {
    databaseRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setUploadedFiles({ ...data });
    });
  }, []);

  const handleType = (event) => {
    setType(event.target.value);
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfAsFile(e.target.files[0]);
    }
  };

  //connection with firebase storage after click on upload button pdf pass
  function handleUpload() {
    setisLoading(true);

    const formData = new FormData();
    formData.append("report_file", pdfAsFile);

    fetch("https://cc0c0c65f452.ngrok.io/upload/" + type, {
      method: "POST",
      body: formData,
      headers: {
        mode: "no-cors",
      },
    })
      .then((response) => {
        console.log("response pre block", response);
        return response.json();
      })
      .then(
        (result) => {
          setisLoading(false);
          console.log("Success:", result);
          databaseRef.push(result);
        },
        (error) => {
          setisLoading(false);
          console.log("Error:", error);
        }
      )
      .catch((error) => {
        setisLoading(false);
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <div
        style={{
          minHeight: "150px",
          marginTop: "60px",
          background: "#FFFFFF",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
          borderRadius: "12px",
        }}
      >
        Upload New File Here (Pdf Format Only)
      </div>
      <div>
        <RadioGroup value={type} onChange={handleType}>
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="ATB Financial"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="ATB Matser Card"
          />
        </RadioGroup>
      </div>
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
      <TableContent setEditDetailData={setEditDetailData} data={uploadedFiles} />
    </div>
  );
}
