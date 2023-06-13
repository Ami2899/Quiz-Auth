import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css'

type StartProps={
    setStartTimer:React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn:boolean;
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>
}

const Start:React.FC<StartProps> = ({setStartTimer,isLoggedIn, setIsLoggedIn}) => {
    const navigate=useNavigate()
    function startQuiz() {
      if(isLoggedIn){
        setStartTimer(true);
        navigate("/quiz")
      }
      else{
        navigate("/signin")
      }
      }
  return (
    <div>
      <button className="start-button" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  )
}

export default Start
