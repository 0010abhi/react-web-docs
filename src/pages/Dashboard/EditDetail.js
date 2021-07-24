import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { database } from "../Firebase";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { dashboardStyles } from "./style";

export default function EditDetail(props) {
  const classes = dashboardStyles();
  const history = useHistory();
  const databaseRef = database.ref("/" + props.match.params.id);
  const [parserData,] = useState(props.location.state.data[0]);
  const [fileType,] = useState(props.location.state.fileType);

  function goBack() {
    history.goBack();
  }

  function updateDatabase() {
    databaseRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("editdetail", data);
    });
  }

  function handleChange(key, index, value, tableIndex) {
    console.log('parser data', parserData);
    const bodyData = parserData.data[tableIndex].body;
    console.log('key, index, value', key, index, value, tableIndex);
    let bodyRowData = bodyData[index];
    bodyRowData = {
      ...bodyRowData,
      [key]: value
    }
    console.log('bodyRowData', bodyRowData);
  }

  // update edited data to firebase object
  return (
    <div className={classes.dashboardContainer}>
      <h2>Edit Detail</h2>
      {parserData.data.map((pageData, pageIndex) => {
        return (
          <>
            {pageIndex === 0 && fileType === "1" && <h3>Details of your account transaction</h3>}
            {pageIndex === 0 && fileType === "2" && <h3>Payments & Credits</h3>}
            {pageIndex === 1 && fileType === "2" && <h3>Purchases & Returns</h3>}
            <div style={{ padding: "25px" }}>
              <Table
                key={pageIndex}
                className={classes.table}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow style={{ background: "#E8EDFF" }}>
                    {pageData.header.map((datum, index) => (
                      <TableCell key={index} align="center">
                        {datum.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pageData.body.map((datum, index) => (
                    <TableRow key={index}>
                      {pageData.header.map((headerDatum, headerIndex) => (
                        <TableCell key={headerIndex} align="center">
                          {headerIndex > 1 ? (
                            <TextField
                              onChange={(e) => {
                                handleChange(
                                  headerDatum.key,
                                  index,
                                  e.target.value,
                                  pageIndex
                                );
                              }}
                              value={datum[headerDatum.key]}
                              variant="outlined"
                            />
                          ) : (
                            <span>{datum[headerDatum.key]}</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        );
      })}
      <div
        style={{
          position: "sticky",
          display: "flex",
          justifyContent: "flex-end",
          background: "#f4f4f4",
          bottom: 0,
          left: 0,
          right: 0,
          height: "70px",
          padding: "15px",
        }}
      >
        <Button
          style={{ marginRight: "15px" }}
          onClick={goBack}
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={updateDatabase} variant="contained" color="primary">
          Save
        </Button>
      </div>
    </div>
  );
}
