import React, { useState } from 'react';
import Question from './Question';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container text-center">
      {showScore ? (
        <div className="score-section">
          <h2 className="text-2xl font-bold">Your Score: {score} / {questions.length}</h2>
        </div>
      ) : (
        <div className="question-section">
          <Question
            question={questions[currentQuestion]}
            handleAnswerOptionClick={handleAnswerOptionClick}
          />
        </div>
      )}
    </div>
  );
};

export default Quiz;
