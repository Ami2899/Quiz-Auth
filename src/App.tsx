import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Start from './Components/Start';
import Quiz from './Components/Quiz';
import Timer from './Components/Timer';
import { useState } from 'react';
import Result from './Components/Result';
import { questions } from './QuizData/QuizData';
import Signin from './Components/Signin';

function App() {
  const [startTimer, setStartTimer] = useState(() => {
    const storedTimer = localStorage.getItem('timer');
    return storedTimer ? JSON.parse(storedTimer) : false;
  });

  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify(startTimer));
  }, [startTimer]);

  const [score,setScore]= React.useState(0)
  const[isLoggedIn, setIsLoggedIn]=useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start setStartTimer={setStartTimer}  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/quiz" element={<Quiz setStartTimer={setStartTimer} startTimer={startTimer} setScore={setScore} score={score} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="signin" element={<Signin setIsLoggedIn={setIsLoggedIn}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
