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
import { storage } from "../Firebase";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TableContent() {
  const classes = useStyles();
  const [uploadedFiles, setuploadedFiles] = useState([]);

  useEffect(() => {
    listAll();
  }, []);

  //list all name of file present
  function listAll() {
    const listRef = storage.ref().child("");
    listRef
      .listAll()
      .then((res) => {
        console.log(res);
        setuploadedFiles(res.items);

        res.items.forEach((itemRef) => {
          console.log(itemRef.fullPath);
          
        });
      })
      .catch((err) => {
        console.log("err", err);
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
              {/* <TableCell align="center">Upload Date & Time</TableCell> */}
              {/* <TableCell align="center">Business Type</TableCell>   */}
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {uploadedFiles.map((datum, index) => (
              <TableRow key={index}>
                {/* <TableCell align="center">{row.id}</TableCell> */}
                <TableCell align="center">{datum.name}</TableCell>
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
