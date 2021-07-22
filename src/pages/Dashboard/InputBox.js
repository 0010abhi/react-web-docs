import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { database } from "../Firebase";

export default function InputBox() {
  const [text, setText] = useState("");

  function handleText(value) {
    setText(value);
  }

  //connection with realtime database after click on submit button
  function handleSubmit() {
    console.log(text);
    console.log("hey", database);
    database
      .ref("users")
      .set({
        text: text,
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div>
      <div style={{ marginTop: "25px" }}>
        <TextField
          label="First Name"
          variant="outlined"
          value={text}
          onChange={(event) => {
            handleText(event.target.value);
            // console.log(event.target.value)
          }}
        />
      </div>
      <div style={{ marginTop: "15px" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
