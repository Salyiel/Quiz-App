import React from 'react';
import Question from './Question';

const QuizList = ({ questions }) => {
  return (
    <div className="quiz-list">
      {questions.map((question, index) => (
        <Question key={index} question={question} />
      ))}
    </div>
  );
};

export default QuizList;
