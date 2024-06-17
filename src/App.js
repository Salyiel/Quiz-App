import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import QuizList from './Components/QuizList';
import Score from './Components/Score';

// Configure axios to use retry logic
axiosRetry(axios, {
  retries: 3, // Number of retry attempts
  retryCondition: (error) => {
    // Retry on 429 status code or network errors
    return error.response.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(error);
  },
  retryDelay: (retryCount) => {
    // Exponential backoff delay
    return axiosRetry.exponentialDelay(retryCount);
  }
});

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php', {
          params: {
            amount: 10,
            type: 'multiple'
          }
        });
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const resetQuiz = () => {
    setQuestions([]);
    setLoading(true);
    setError(null);
    setScore(0);
    setQuizCompleted(false);
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php', {
          params: {
            amount: 10,
            type: 'multiple'
          }
        });
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchQuestions();
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-500">Error: {error.message}</div>;

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">React Quiz App</h1>
      <Score score={score} total={questions.length} />
      {quizCompleted ? (
        <div className="text-center">
          <button
            onClick={resetQuiz}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        questions.length > 0 && <QuizList questions={questions} setScore={setScore} setQuizCompleted={setQuizCompleted} />
      )}
    </div>
  );
};

export default App;
