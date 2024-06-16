import React from 'react';

const Question = ({ question, handleAnswerOptionClick }) => {
  const shuffledAnswers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

  return (
    <div className="question-container mb-4">
      <h3 className="text-xl font-semibold mb-4" dangerouslySetInnerHTML={{ __html: question.question }}></h3>
      <div className="answer-section">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerOptionClick(answer === question.correct_answer)}
            className="block w-1/2 mx-auto my-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
