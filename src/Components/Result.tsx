import {useNavigate} from "react-router-dom"
import { useState } from "react";
import { questions } from "../QuizData/QuizData";
import { useEffect } from "react";

type ResultProps = {
  score: number;
  totalQuestions: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  selectedOptions: number[];
  correctAnswers: boolean[];
  setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>;
  setStartTimer:React.Dispatch<React.SetStateAction<boolean>>;
  startTimer:boolean
};

const Result: React.FC<ResultProps> = ({
  score,
  totalQuestions,
  setScore,
  selectedOptions,
  correctAnswers,
  setIsLoggedIn,
  setStartTimer,
  startTimer
}) => {
  const navigate = useNavigate();
  const [showAnswers, setShowAnswers] = useState(false);
  
  const restartGame = () => {
    setScore(0);
    navigate("/");
    setIsLoggedIn(true)
  };

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };

  const logout=()=>{
   setScore(0)
   setIsLoggedIn(false)
   navigate("/")
  }

  return (
    <div className="final-score">
      <h2>Your Final Score is</h2>
      <h3>
        {score} out of {totalQuestions} correct.
      </h3>
      <button onClick={restartGame} className="start-button">Restart Game</button>
      <br/>
     {!showAnswers && <button onClick={handleShowAnswers}className="start-button">Show Answers</button>}
     <br/>
     <button onClick={logout} className="start-button">Log Out</button>

      {showAnswers && (
        <div className="answers">
          {questions.map((question, index) => {
            const selectedOption = question.options.find(
              (option) => option.id === selectedOptions[index]
            );
            const correctOption = question.options.find((option) => option.isCorrect);
            const isCorrect = correctAnswers[index];

            return (
              <div key={question.id}>
                <h4>{question.questiontext}</h4>
                <p>
                  Selected Option:{" "}
                  <span style={{ color: isCorrect ? "green" : "red" }}>
                    {selectedOption?.optiontext}
                  </span>
                </p>
                <p>
                  Correct Option:{" "}
                  <span style={{ color: "green" }}>{correctOption?.optiontext}</span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Result;
