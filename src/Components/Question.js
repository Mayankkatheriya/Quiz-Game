import React from "react";

const Question = ({question}) => {

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

  // * Shuffle the answer options
  const shuffledAnswers = shuffleArray([
    ...question.incorrect_answers,
    question.correct_answer,
  ]);

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

export default Question;
