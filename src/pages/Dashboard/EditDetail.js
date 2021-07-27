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
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

export default function EditDetail(props) {
  const classes = dashboardStyles();
  const history = useHistory();
  const firebaseUniqueId = props.match.params.id;
  const databaseRef = database.ref("/");
  const [parserData, setParserData] = useState(props.location.state.data[0]);
  const [fileType] = useState(props.location.state.fileType);
  const [saveFileLoading, setSaveFileLoading] = useState(false);

  function goBack() {
    history.goBack();
  }

  function updateDatabase() {
    setSaveFileLoading(true);
    databaseRef.child(firebaseUniqueId).update({
      updatedData: parserData,
    }, (error) => {
      if(error){
        console.log('console.error();', error);
      } else {
        console.log('success');
      }
      setSaveFileLoading(false);
    }).catch(err => {
      setSaveFileLoading(false);
      console.error(err);
    });
  }

  function handleChange(key, index, value, tableIndex) {
    let bodyData = [...parserData.data[tableIndex].body];
    bodyData[index] = {
      ...bodyData[index],
      [key]: value,
    };
    const tempDataRender = [...parserData.data];
    tempDataRender[tableIndex] = {
      ...tempDataRender[tableIndex],
      body: bodyData,
    };
    let tempData = parserData;
    tempData = {
      ...tempData,
      data: tempDataRender,
    };
    setParserData(tempData);
  }

  // update edited data to firebase object
  return (
    <div className={classes.dashboardContainer}>
      <h2>Edit Detail</h2>
      {parserData.data.map((pageData, pageIndex) => {
        // console.log('pagedata',pageData)
        return (
          <>
            {pageIndex === 0 && fileType === "1" && (
              <h3>Details of your account transaction</h3>
            )}
            {pageIndex === 0 && fileType === "2" && <h3>Payments & Credits</h3>}
            {pageIndex === 1 && fileType === "2" && (
              <h3>Purchases & Returns</h3>
            )}
            <div className={classes.editContainer}>
              <Table
                key={pageIndex}
                className={classes.table}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow className={classes.editRow}>
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
      <div className={classes.dashboardSaveCancel}>
        <Button
          className={classes.editCancel}
          onClick={goBack}
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={updateDatabase} variant="contained" color="primary">
          Save
        </Button>
        <Backdrop className={classes.backdrop} open={saveFileLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
}
