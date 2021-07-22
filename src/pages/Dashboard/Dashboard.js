import React from "react";
import AttachFile from "./AttachFile";
import RadioBtn from "./RadioBtn";
import TableContent from "./TableContent";
// import InputBox from "./InputBox";

export default function Dashboard() {
  return (
    <div>
      <RadioBtn />
      <AttachFile />
      <TableContent />
      {/* <InputBox /> */}
    </div>
  );
}
