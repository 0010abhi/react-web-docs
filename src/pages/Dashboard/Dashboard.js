import React, { useState } from "react";
import UploadFile from "./UploadFile";


export default function Dashboard() {
  const [editDetailData, setEditDetailData] = useState({});
  return (
    <div>
      <UploadFile editDetailData={editDetailData} setEditDetailData={setEditDetailData} />
    </div>
  );
}
