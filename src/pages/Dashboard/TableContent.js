import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
// import { storage } from "../Firebase";
import { useHistory } from "react-router-dom";
// import { Document } from "react-pdf";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TableContent(props) {
  const classes = useStyles();
  // const [uploadedFiles, setuploadedFiles] = useState([]);
  const history = useHistory();
  // const [showPdf, setShowPdf] = useState(false);
  // const [url, setUrl] = useState('');

  // useEffect(() => {
  //   listAll();
  // }, []);

  //list all name of file present
  // get data from database
  // function listAll() {

  // fetch(
  // 	'https://30a712d7d785.ngrok.io/file_list',
  // 	{
  // 		method: 'GET',
  //     headers:{
  //       mode: "no-cors",
  //       // 'Access-Control-Allow-Origin':'*',
  //       "Content-Type": "application/json",
  //     }
  // 	}
  // )
  // 	.then((response) => {
  //     console.log('response pre block', response);
  //     return response.json()
  //   })
  // 	.then((result) => {
  //     // setisLoading(false);
  // 		console.log('Success:', result);
  // 	},(error) => {
  //     // setisLoading(false);
  // 		console.log('Error:', error);
  // 	})
  // 	.catch((error) => {
  //     // setisLoading(false);
  // 		console.error('Error:', error);
  // 	});

  // const listRef = storage.ref().child("");
  // listRef
  //   .listAll()
  //   .then((res) => {
  //     console.log(res);
  //     setuploadedFiles(res.items);

  //     res.items.forEach((itemRef) => {
  //       console.log(itemRef.fullPath);

  //     });
  //   })
  //   .catch((err) => {
  //     console.log("err", err);
  //   });
  // }

  function openPdf(url) {
    // storage
    //   .ref(fileName)
    //   .getDownloadURL()
    //   .then((url) => {
    // setUrl(url);
    window.open(url);
    // setShowPdf(true);
    // });
  }

  // function getBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //   });
  // }

  function editDetails(data, firebaseUniqueKey) {
    history.push(`/edit-detail/${firebaseUniqueKey}`);
    let URL = "https://30a712d7d785.ngrok.io/";
    if (data.fileType === "1") {
      URL += "parser-type-one";
    } else if (data.fileType === "2") {
      URL += "parser-type-two";
    }

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({gcsUrl: data.gcsUrl}),
      headers: {
        mode: "no-cors",
        // 'Access-Control-Allow-Origin':'*',
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("response pre block", response);
        return response.json();
      })
      .then(
        (result) => {
          // setisLoading(false);
          console.log("Success:", result);
        },
        (error) => {
          // setisLoading(false);
          console.log("Error:", error);
        }
      )
      .catch((error) => {
        // setisLoading(false);
        console.error("Error:", error);
      });
  }

  return (
    <div
      style={{
        marginTop: "40px",
        marginLeft: "50px",
        marginRight: "50px",
        background: "#FFFFFF",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "10px",
      }}
    >
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              Recent Uploaded Files
            </div>
            <TableRow style={{ background: "#E8EDFF" }}>
              {/* <TableCell><Button style={{ 
                    background: '#FFFFFF',
                    border: '1px solid #ACACAC',
                    borderRadius: '10px',
                    width:'85px',
                    height:'30px'
                }}>Actions</Button>
            </TableCell> */}
              {/* <TableCell align="center">Customer ID</TableCell> */}
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Type</TableCell>  
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(props.data).map((datum, index) => (
              <TableRow key={index}>
                {/* <TableCell align="center">{row.id}</TableCell> */}
                <TableCell align="center">
                  {props.data[datum].fileType}
                </TableCell>
                {/* <TableCell align="center">{row.upload}</TableCell> */}
                {/* <TableCell align="center">{row.business}</TableCell> */}
                <TableCell align="center">
                  <Button
                    style={{
                      postion: "absolute",
                      width: "110px",
                      height: "30px",
                      background: "#3254CB",
                      borderRadius: "20px",
                      color: "#FFFFFF",
                      fontSize: "15px",
                      textTransform: "none",
                    }}
                    onClick={() => {
                      openPdf(props.data[datum].publicUrl);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    style={{
                      postion: "absolute",
                      width: "110px",
                      height: "30px",
                      background: "#FFFFFF",
                      borderRadius: "20px",
                      color: "#3254CB",
                      fontSize: "15px",
                      border: "1px solid #3254CB",
                      textTransform: "none",
                    }}
                    onClick={() => {
                      editDetails(props.data[datum], datum);
                    }}
                  >
                    Edit Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*  (
        <div>
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      )} */}
    </div>
  );
}
