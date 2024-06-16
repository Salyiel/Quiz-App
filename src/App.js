import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizList from './Components/QuizList';
import Score from './Components/Score';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);

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

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-500">Error: {error.message}</div>;

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">React Quiz App</h1>
      <Score score={score} total={questions.length} />
      {questions.length > 0 ? (
        <QuizList questions={questions} setScore={setScore} />
      ) : (
        <div className="text-center text-lg">No questions available</div>
      )}
    </div>
  );
};

export default App;
