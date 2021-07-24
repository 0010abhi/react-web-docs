import React, { useState } from "react";
import UploadFile from "./UploadFile";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { dashboardStyles } from "./style";

export default function Dashboard() {
  //todo: 2 localstate using usestate-uploadfileloading,editdetailsloading
  const [uploadFileLoading, setUploadFileLoading]= useState(false);
  const [editDetailLoading, setEditDetailLoading]= useState(false);
  const classes = dashboardStyles();

  return (
    <div>
      { uploadFileLoading && <Backdrop className={classes.backdrop} open={uploadFileLoading} >
        <CircularProgress color="inherit" />
      </Backdrop>  }
      <div>
        {
          editDetailLoading && <Backdrop className={classes.backdrop} open={editDetailLoading} >
          <CircularProgress color="inherit" />
        </Backdrop>
        }
      </div>
      <UploadFile setUploadFileLoading={setUploadFileLoading} setEditDetailLoading={setEditDetailLoading}/>
    
    </div>
  );
}
