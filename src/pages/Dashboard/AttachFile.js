import React from "react";
import UploadFile from "./UploadFile";

export default function AttachFile() {
  return (
    <div>
      <div
        style={{
          minHeight: "150px",
          marginTop: "60px",
          background: "#FFFFFF",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
          borderRadius: "12px",
        }}
      >
        <div>
          <p>Upload New File Here (Pdf Format Only)</p>
        </div>
        <div>
          <UploadFile />
        </div>
      </div>
    </div>
  );
}
