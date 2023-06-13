import React from 'react';
import { questions } from '../QuizData/QuizData';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Result from './Result';
import { useEffect } from 'react';

type QuizProps = {
    setStartTimer: React.Dispatch<React.SetStateAction<boolean>>;
    startTimer: boolean;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    score: number;
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>;
  };
  
  const Quiz: React.FC<QuizProps> = ({ setStartTimer, startTimer, setScore, score,setIsLoggedIn }) => {
    const [currentQues, setCurrentQues] = React.useState(0);
    const [res, setRes] = React.useState(false);
    const [clickedAnswer, setClickedAnswer] = React.useState(0);
    const [seconds, setSeconds] = React.useState(() => {
      const storedSeconds = localStorage.getItem('seconds');
      return storedSeconds ? parseInt(storedSeconds) : 20;
    });
    const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
    const [selectedOptions, setSelectedOptions] = React.useState<number[]>([]);
    const [correctAnswers, setCorrectAnswers] = React.useState<boolean[]>([]);
  
    const navigate = useNavigate();
  
    function handleAns(isCorrect: boolean) {
      setTimeout(() => {
        if (selectedOption === null) {
          return; 
        }
  
        setClickedAnswer(0);
  
        const updatedSelectedOptions = [...selectedOptions, selectedOption];
        setSelectedOptions(updatedSelectedOptions);
  
        if (currentQues + 1 < questions.length) {
          setCurrentQues(currentQues + 1);
        }
        if (currentQues + 1 === questions.length) {
          setRes(true);
        }
        if (isCorrect) {
          setScore((score) => score + 1);
        }
  
        const correctAnswer = questions[currentQues].options.find((option) => option.isCorrect);
        const isAnswerCorrect = correctAnswer ? correctAnswer.id === selectedOption : false;
        const updatedCorrectAnswers = [...correctAnswers, isAnswerCorrect];
        setCorrectAnswers(updatedCorrectAnswers);
  
        setSelectedOption(null);
        setSeconds(20);
      }, 600);
    }
  
    function restartGame() {
      setScore(0);
      setCurrentQues(0);
      setRes(false);
      setStartTimer(false);
      setSelectedOption(null);
      setSelectedOptions([]);
      setCorrectAnswers([]);
      navigate('/');
    }
  
    return (
      <>
        {res ? (
          <Result
            score={score}
            totalQuestions={questions.length}
            setScore={setScore}
            selectedOptions={selectedOptions}
            correctAnswers={correctAnswers}
            setIsLoggedIn={setIsLoggedIn}
            setStartTimer={setStartTimer}
            startTimer={startTimer}
          />
        ) : (
          <div className="question-card">
            <h2>Score is {score}</h2>
            <div>
              <h2>Question {currentQues + 1} out of {questions.length}</h2>
              {startTimer && (
                <Timer
                  setRes={setRes}
                  setCurrentQues={setCurrentQues}
                  seconds={seconds}
                  setSeconds={setSeconds}
                  currentQues={currentQues}
                  questions={questions}
                />
              )}
            </div>
            <h2>{questions[currentQues].questiontext}</h2>
            <ul>
              {questions[currentQues].options.map((option) => {
                return (
                  <li
                    onClick={() => {
                      handleAns(option.isCorrect);
                      setSelectedOption(option.id);
                    }}
                    key={option.id}
                  >
                    {option.optiontext}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </>
    );
  };
  
  export default Quiz;
  
