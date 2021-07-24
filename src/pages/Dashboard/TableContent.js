import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { dashboardStyles } from "./style";

export default function TableContent(props) {
  const classes = dashboardStyles();
  const history = useHistory();
  const {setEditDetailLoading}= props;

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
    setEditDetailLoading(true);
    let URL = "https://364e5c6ae474.ngrok.io/";
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
          setEditDetailLoading(false);
          console.log("Success:", result);
          // setEditDetailData(result)
          history.push(`/edit-detail/${firebaseUniqueKey}`, {
            data: result,
            fileType: data.fileType,
          });
          // Update Database with parser
          //originalData: originalData
        },
        (error) => {
          setEditDetailLoading(false);
          console.log("Error:", error);
        }
      )
      .catch((error) => {
        setEditDetailLoading(false);
        console.error("Error:", error);
      });
  }

  return (
    <div
    className={classes.tableMain}
    >
      <TableContainer component={Paper}>
        <div className={classes.tableContainer} >Recent Uploaded Files</div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableRowHeader}>
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
                  {props.data[datum].fileType === "1"
                    ? "ATB Financial"
                    : "ATB Matser Card"}
                </TableCell>
                <TableCell align="center">
                  {props.data[datum].createdAt}
                </TableCell>
                <TableCell align="center">
                  {props.data[datum].updatedAt}
                </TableCell>
                <TableCell align="center">
                  <Button
                    className={classes.tableView}
                    onClick={() => {
                      openPdf(props.data[datum].publicUrl);
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    className={classes.tableEdit}
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
