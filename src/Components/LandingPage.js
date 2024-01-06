import React, { useEffect, useState } from "react";
import loader from "../Assets/loader.gif";
import wrong from "../Assets/wrong.gif";

const LandingPage = ({ level }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [skip, setSkip] = useState(0);
  const [timer, setTimer] = useState(30);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  //TODO func to fetch data from API
  async function fetchData() {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&type=multiple&cate&difficulty=${level}`
      );
      const data = await response.json();
      if (data.response_code === 0) {
        setLoading(false);
        setQuestions(data.results);
      } else {
        setLoading(false);
        setQuestions([]);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  //TODO useEffect fir initial fetching data from API
  useEffect(() => {
    document.title = `Quiz Level ${level.toUpperCase()}`;
    fetchData();
  }, []);

  //TODO if data fetch successful set answers by suffling for each question and set timer to 30 again
  useEffect(() => {
    setTimer(30);
    const currentQuestionData = questions[currentQuestion];
    if (currentQuestionData) {
      const shuffledArray = shuffleArray([
        ...currentQuestionData.incorrect_answers,
        currentQuestionData.correct_answer,
      ]);
      setShuffledAnswers(shuffledArray);
    }
  }, [currentQuestion, questions]);

  //TODO start timer for each new question
  useEffect(() => {
    // Set up the timer countdown
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear the interval when the component unmounts or the question changes
    return () => clearInterval(timerInterval);
  }, [currentQuestion]);

  //TODO useEffect with timer dependency, if timer zero handle situation
  useEffect(() => {
    // Check if the timer reaches 0
    if (timer === 0) {
      // Move to the next question when the timer runs out
      handleSkip()
    }
  }, [timer]);

  //TODO handle click on answer
  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    //* Move to the next question
    setCurrentQuestion(currentQuestion + 1);
  };

  //TODO handle to skip question
  const handleSkip = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSkip(skip + 1);
  };

  //TODO Helper function to shuffle array elements
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  //TODO render according to condition
  const renderQuestion = () => {
    const question = questions[currentQuestion];

    if (!question) {
      // Quiz completed
      return (
        <div className="result">
          <p>Quiz Completed!</p>
          <p>
            Your Score : <span>{score}</span>/10
          </p>
          <p>
            Skipped Questions : <span>{skip}</span>
          </p>
          <button className="skip-btn" onClick={() => window.location.reload()}>
            Reset
          </button>
        </div>
      );
    }

    return (
      <div className="question">
        <div className="ctg">
          {"Category: "}&nbsp;<span>{question.category}</span>
        </div>
        <div className="timer">
          Time Remaining :&nbsp;<span>{timer}</span>
        </div>
        <h3>
          Q-{currentQuestion + 1}.{" "}
          <span dangerouslySetInnerHTML={{ __html: question.question }} />
        </h3>
        <ul>
          {shuffledAnswers.map((answer, index) => (
            <li key={answer} onClick={() => handleAnswerClick(answer)}>
              <span>{String.fromCharCode(index + 65)}.</span>{" "}
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </li>
          ))}
        </ul>
        <button onClick={handleSkip} className="skip-btn">
          Skip Question
        </button>
      </div>
    );
  };

  //TODO Rendering data to UI
  return (
    <div className="landing">
      {isLoading ? (
        <div className="loading">
          <img src={loader} alt="" className="loader" />
        </div>
      ) : questions.length === 0 ? (
        <div className="loading">
          <img src={wrong} alt="" className="wrong" />
          <button onClick={() => window.location.reload()} className="reload">
            Reload
          </button>
        </div>
      ) : (
        <div className="questions">{renderQuestion()}</div>
      )}
    </div>
  );
};

export default LandingPage;
