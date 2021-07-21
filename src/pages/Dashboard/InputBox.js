import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { database } from '../Firebase';

// import { useRef } from 'react';

export default function InputBox(){

    const[text, setText]=useState('');

    // const valueRef1 = useRef('')
    // const valueRef2 = useRef('') 
    // function handleSubmit(){
    //     console.log(valueRef1.current.value , valueRef2.current.value) 
    // }
     //console.log(event.target.value)
        // setText(event.target.value);
    // inputRef={valueRef1}

    function handleText(value){
        setText(value);
       //console.log(value);   
    }

    //connection with realtime database after click on submit button 
    function handleSubmit(){
        console.log(text)
        console.log('hey',database)
        database.ref('users').set({
            text : text
        }).catch((err) => {
            console.log('err', err)
          });
    }

    // function getData(){
    //     console.log(text)
    // }
   
    return(
        <div>
            <div style={{marginTop:'25px'}}>
                <TextField label="First Name" variant="outlined" value={text} onChange={(event) => {
                    handleText(event.target.value); 
                    // console.log(event.target.value)
                }} /> 
            </div>
            {/* <div style={{marginTop:'25px'}}>
                <TextField label="Last Name" variant="outlined" onChange={() => {
                    handleText()
                }} />
            </div> */}
            <div style={{marginTop:'15px'}}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit</Button>
            </div>
            {/* <div style={{marginTop:'15px'}}>
                <Button variant="contained" color="primary" onClick={getData}>
                    Check</Button>
            </div> */}
        </div>
    )
}