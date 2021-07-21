import React from 'react';
import UploadFile from './UploadFile';

export default function AttachFile(){
    return(
      <div>
        <div style={{height: '110px', marginLeft: '50px', marginRight:'900px', marginTop: '60px', background: '#FFFFFF', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)', borderRadius: '10px' }}>
            <div style={{marginRight:'230px'}}>
                <p>Upload New File Here</p>
            </div>
            <div style={{marginLeft:'10px'}}>
                <UploadFile />
            </div>
        </div>
        <div style={{color: '#ACACAC', marginRight:'450px'}}>
            <p>*PDF Formate Only</p>
        </div>
      </div>
    )
}