import React from "react";
import AttachFile from "./AttachFile";
import InputBox from "./InputBox";
import TableContent from "./TableContent";

export default function Dashboard() {
  return (
    <div>
      <AttachFile />
      <TableContent />
      <InputBox />
    </div>
  );
}
