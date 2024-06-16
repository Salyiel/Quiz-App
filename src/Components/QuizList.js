import React, { useState } from 'react';
import Question from './Question';

const QuizList = ({ questions, setScore }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert('Quiz finished! Your score: ' + isCorrect);
    }
  };

  return (
    <div className="quiz-list">
      <Question
        question={questions[currentQuestionIndex]}
        onAnswerSubmit={handleAnswerSubmit}
      />
    </div>
  );
};

export default QuizList;
