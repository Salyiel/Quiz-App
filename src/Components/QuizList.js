import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const fetchQuizCategories = async () => {
  const response = await axios.get('https://opentdb.com/api_category.php');
  return response.data.trivia_categories;
};

const QuizList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchQuizCategories();
      setCategories(data);
    };

    getCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Categories</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <li key={category.id} className="bg-white shadow-lg rounded-lg p-4 hover:bg-blue-100 transition duration-200">
            <Link to={`/quiz/${category.id}`} className="text-lg font-medium text-blue-600">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
