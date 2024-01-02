import { useState } from "react";
import LandingPage from "./LandingPage";

function App() {
  const [difficulty, setDifficulty] = useState("");

  return (
    <>
      {difficulty ? (
        <LandingPage level={difficulty} />
      ) : (
        <div className="starting-page">
          <div className="start-content">
            <h1>Welcome to the Quiz</h1>
            <p className="level">Choose a level of difficulty below:</p>
            <div className="level-btn-box">
              <button
                type="button"
                className="level-btn"
                onClick={() => setDifficulty("easy")}
              >
                Easy
              </button>
              <button
                type="button"
                className="level-btn"
                onClick={() => setDifficulty("medium")}
              >
                Medium
              </button>
              <button
                type="button"
                className="level-btn"
                onClick={() => setDifficulty("hard")}
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
