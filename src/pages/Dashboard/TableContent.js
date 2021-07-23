import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TableContent(props) {
  const {setEditDetailData} = props;
  const classes = useStyles();
  const history = useHistory();

  function openPdf(url) {
    window.open(url);
  }

  /**
   * 
   * @param {*} data 
   * @param {*} firebaseUniqueKey 
   */
  function editDetails(data, firebaseUniqueKey) {
    // ng_rok_url
    let URL = "https://cc0c0c65f452.ngrok.io/";
    // conditional end point based on file type by value
    if (data.fileType === "1") {
      URL += "parser-type-one";
    } else if (data.fileType === "2") {
      URL += "parser-type-two";
    }

    // 
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ gcsUrl: data.gcsUrl }),
      headers: {
        mode: "no-cors",
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
          // setEditDetailData(result)
          history.push(`/edit-detail/${firebaseUniqueKey}`, { data : result});
          // Update Database with parser
          //originalData: originalData
          
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
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Created at</TableCell>
              <TableCell align="center">Updated at</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(props.data).map((datum, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {props.data[datum].fileId}
                  {".pdf"}
                </TableCell>
                <TableCell align="center">
                  {props.data[datum].fileType}
                </TableCell>
                <TableCell align="center">
                  {props.data[datum].createdAt}
                </TableCell>
                <TableCell align="center">
                  {props.data[datum].updatedAt}
                </TableCell>
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
    </div>
  );
}
