import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { database } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function EditDetail(props) {
  const classes = useStyles();
  const history = useHistory();
  const databaseRef = database.ref("/" + props.match.params.id);
  const [parserData, setParserData] = useState(props.location.state.data[0]);

  function goBack() {
    history.goBack();
  }

  function updateDatabase() {
    databaseRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("editdetail", data);
    });
    // databaseRef.set({

    // },(error) => {
    //     if (error) {
    //         console.log('failed')
    //       // The write failed...
    //     } else {
    //         console.log('success')
    //       // Data saved successfully!
    //     }
    //   })
  }

  // update edited data to firebase object
  return (
    <div>
      <h3>Edit Detail</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              Recent Uploaded Files
            </div>
            <TableRow style={{ background: "#E8EDFF" }}>
              {parserData.header.map((datum, index) => (
                <TableCell key={index} align="center">
                  {datum.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {parserData.body.map((datum, index) => (
              <TableRow key={index}>
                {parserData.header.map((headerDatum, headerIndex) => (
                  <TableCell key={headerIndex} align="center">
                    {headerIndex > 1 ? (
                      <TextField
                        // label="Outlined"
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
      </TableContainer>
      <div>
        <Button onClick={goBack} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={updateDatabase} variant="contained" color="primary">
          Save
        </Button>
      </div>
    </div>
  );
}
