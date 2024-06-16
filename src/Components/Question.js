import React, { useState } from 'react';

const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Question = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    const isCorrect = selectedOption === question.correct_answer;
    alert(isCorrect ? 'Correct!' : 'Incorrect!');
    setSelectedOption(null);
  };

  const allOptions = [
    ...question.incorrect_answers,
    question.correct_answer
  ].sort();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{decodeHtml(question.question)}</h2>
      <div>
        {allOptions.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">{decodeHtml(option)}</span>
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default Question;
