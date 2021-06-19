import React, {useState} from 'react';

export default function LogIn(props){
  const {pageTitle} = props;
  const x = 'hello gello';
  const [email, setEmail] = useState('')

  function handleEmailChange(e) {
    console.log(e);
    setEmail(e.target.value)
  }

  return(
    <div>
      log in {x}
{pageTitle} {email}
      <input type='text' value={email} onChange={handleEmailChange} />
    </div>
  )
}