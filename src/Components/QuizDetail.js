import React, { useEffect, useState } from 'react';
import fetchQuizQuestions from '../../services/quizService';
import Question from './Question';
import Timer from './Timer';
import Score from './Score';

const QuizDetail = ({ match }) => {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    const getQuiz = async () => {
      const data = await fetchQuizQuestions(10, match.params.id);
      setQuiz(data);
    };

    getQuiz();
  }, [match.params.id]);

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  if (!quiz.length) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      {!isQuizFinished ? (
        <>
          <Timer duration={60} onTimeUp={() => setIsQuizFinished(true)} />
          <Question
            question={quiz[currentQuestionIndex]}
            onAnswerSubmit={handleAnswerSubmit}
          />
        </>
      ) : (
        <Score score={score} totalQuestions={quiz.length} />
      )}
    </div>
  );
};

export default QuizDetail;
