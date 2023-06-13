import React, { useEffect, useState } from 'react'
import { auth,provider } from './Config'
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom'

type SignInProps={
    // isLoggedIn:boolean;
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>
}

const Signin:React.FC<SignInProps> = ({setIsLoggedIn}) => {
    const [value,setValue]=useState('')
    const navigate=useNavigate()
    const handleClick=()=>{
      signInWithPopup(auth, provider).then((data) => {
        const user = data.user;
        if (user && user.email) {
          setValue(user.email);
          localStorage.setItem('email', user.email);
          navigate("/quiz")
          setIsLoggedIn(true)
        }
      }) 
    }

    useEffect(()=>{
      setValue(localStorage.getItem("email")||'')
    },[])

  return (
    <div>
      <button onClick={handleClick}>Sign in With Google</button>
    </div>
  )
}

export default Signin
