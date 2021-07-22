import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useState } from 'react';

export default function PdfViewer(){
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

    return(
      <div>
        <Document file="report1.pdf" onLoadSuccess={onDocumentLoadSuccess} >
            <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    )
}
