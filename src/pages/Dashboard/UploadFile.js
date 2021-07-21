import React from 'react';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useState, useEffect } from 'react';
import { storage } from '../Firebase';
// import pdfjs from "pdfjs-dist";

export default function UploadFile(){
  const [pdfAsFile, setPdfAsFile] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    listAll()
  }, [])

// async function getContent(src) {
//     const doc = await pdfjs.getDocument(src).promise // note the use of the property promise
//     const page = await doc.getPage(1)
//     return await page.getTextContent()
// }

// function handleFileChange(e){
//   console.log(e.target.files);
//   // const PdfData = getContent(e.target.filles[0])
//   // console.log(PdfData);
// }

const handleChange = (e) => {
  if(e.target.files && e.target.files[0]){
    setPdfAsFile(e.target.files[0]);
  }
};
console.log("pdf: ", pdfAsFile);
    
  //connection with firebase storage after click on upload button pdf pass
const handleUpload = () => {
  const uploadTask = storage.ref(`file_${(new Date()).getMilliseconds()}`).put(pdfAsFile);
  uploadTask.on(
    'state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      //console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then(url => {
          setUrl(url);
           console.log(url);
          //setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       })
    }
  )
};

//list all name of file present
function listAll(){
  const listRef = storage.ref().child('');
  listRef.listAll().then((res)=>{ 
    console.log(res);
    res.items.forEach((itemRef) => {
      console.log(itemRef.name);
    });
  }).catch((err) => {
    console.log('err', err)
  });
}

return (
  <div> 
    {/* <input type='file' onChange={handleFileChange} /> */}
    <label>
      <input 
        //style={{display: 'none'}} 
        type="file" 
        accept=".pdf" 
        onChange={handleChange}
      />
    </label>
    <div style={{marginRight:'200px'}}>
      <Button component="span" style={
        { 
          width: '250px',
          height: '50px',
          background: '#3254CB',
          boxShadow: '4px 4px 8px #B7C7FF',
          borderRadius: '10px',
          color:'#FFFFFF'
        }} onClick={handleUpload}><div style={{marginRight:'10px', marginTop:'5px'}}><CloudUploadIcon /></div> UPLOAD
      </Button>
      </div>
  </div>
)
}