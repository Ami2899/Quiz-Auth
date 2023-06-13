import React, { useEffect } from "react";
import '../App.css'

type TimerProps={
    setRes: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentQues: React.Dispatch<React.SetStateAction<number>>;
    seconds: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
    currentQues: number;
    questions: { id: number; questiontext: string; options: { id: number; optiontext: string; isCorrect: boolean }[] }[];
    // setSelectedOptions: React.Dispatch<React.SetStateAction<(string | null)[]>>;
    // selectedOptions: (string | null)[];
}

const Timer:React.FC<TimerProps> = ({
    setRes,
    setCurrentQues,
    seconds,
    setSeconds,
    currentQues,
    questions
}) => {
  useEffect(() => {
    let interval:any = null;
    interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      }

      if (seconds === 0) {
        if (currentQues < questions.length - 1) {
          setCurrentQues((currentQues) => currentQues + 1);
          setSeconds(20);
        } else {
          setRes(true);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <h3 className="time">
      Time Left - 00 : {seconds < 10 ? `0${seconds}` : seconds}
    </h3>
  );
};

export default Timer;