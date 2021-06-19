import React from 'react';
// import pdfjs from "pdfjs-dist";

export default function UploadFile(){
  

// async function getContent(src) {
//     const doc = await pdfjs.getDocument(src).promise // note the use of the property promise
//     const page = await doc.getPage(1)
//     return await page.getTextContent()
// }

function handleFileChange(e){
  console.log(e.target.files);
  // const PdfData = getContent(e.target.filles[0])
  // console.log(PdfData);
}

return (
  <div>
    <input type='file' onChange={handleFileChange} />
  </div>
)
}