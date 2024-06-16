import React, { useState, useEffect } from 'react';
import Quiz from './Components/Quiz';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Questions:', data.results);
        setQuestions(data.results);
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
      {questions.length > 0 ? <Quiz questions={questions} /> : <div className="text-center text-lg">No questions available</div>}
    </div>
  );
};

export default App;
