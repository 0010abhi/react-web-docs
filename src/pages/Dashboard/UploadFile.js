import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { database } from "../Firebase";
import TableContent from "./TableContent";
import { dashboardStyles } from "./style";

export default function UploadFile(props) {
  const {setUploadFileLoading, setEditDetailLoading} = props;
  const classes = dashboardStyles();
  const [pdfAsFile, setPdfAsFile] = useState({});
  // const [isLoading, setUploadFileLoading] = useState(false);
  const [type, setType] = useState('1');
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
    console.log('pdfAsFile', pdfAsFile);
    if(pdfAsFile.type){
      setUploadFileLoading(true);

      const formData = new FormData();
      formData.append("report_file", pdfAsFile);
  
      fetch("https://warm-abacus-319311.uc.r.appspot.com/upload/" + type, {
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
            setUploadFileLoading(false);
            setPdfAsFile({});
            console.log("Success:", result);
            databaseRef.push(result);
          },
          (error) => {
            setUploadFileLoading(false);
            alert("Error: File Not Uploaded");
          }
        )
        .catch((error) => {
          setUploadFileLoading(false);
          alert("Catch Error: File Not Uploaded");
        });
    } else {
      alert("Please select file");
    }
    
  }

  return (
    <>
    <div className={classes.uploadContainer} >
      <div>Upload New File Here (Pdf Format Only)</div>
      <div>
        <RadioGroup className={classes.uploadRadioBtn} value={type} onChange={handleType}>
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
      <div>
      <label>
        <input
        className={classes.uploadInputBtn}
          // disabled={isLoading}
          type="file"
          accept=".pdf"
          onChange={handleChange}
        />
      </label>
      </div>
      <div>
        <Button
        className={classes.uploadBtn}
          // disabled={isLoading}
          component="span"
          onClick={handleUpload}
        >
            <>
              <CloudUploadIcon
                className={classes.cloudIcon}
              />
              <span>UPLOAD</span>
            </>
        </Button>
      </div>
    </div>
    <TableContent
        data={uploadedFiles}
        setEditDetailLoading={setEditDetailLoading}
      />
      </>
  );
}
