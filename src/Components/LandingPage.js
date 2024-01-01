import React, { useEffect, useState } from "react";

const LandingPage = ({ level }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [skip, setSkip] = useState(0);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    document.title = `Quiz Level ${level.toUpperCase()}`;
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
    fetchData();
  }, []);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    // Move to the next question
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSkip = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSkip(skip + 1);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    if (!question) {
      // Quiz completed
      return (
        <div className="result">
          <p>Quiz Completed!</p>
          <p>
            Your Score: <span>{score}/10</span>
          </p>
          <p>
            Skipped Questions: <span>{skip}</span>
          </p>
          <button className="reset" onClick={() => window.location.reload()}>
            Reset
          </button>
        </div>
      );
    }

    // Shuffle the answer options
    const shuffledAnswers = shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]);

    return (
      <div>
        <div className="ctg-timer">
          <h3>{question.category}</h3>
        </div>
        <h3>{question.question}</h3>
        <ul>
          {shuffledAnswers.map((answer, index) => (
            <li key={answer} onClick={() => handleAnswerClick(answer)}>
              <span>{index + 1}.</span> <span>{answer}</span>
            </li>
          ))}
        </ul>
        <button onClick={handleSkip}>Skip Question</button>
      </div>
    );
  };

  // Helper function to shuffle array elements
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

  // Rendering data to UI
  return (
    <div className="landing">
      {isLoading ? (
        <p>Loading...</p>
      ) : questions.length === 0 ? (
        <p>Try Again</p>
      ) : (
        <div>
          <h1>Quiz App</h1>
          {renderQuestion()}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
